# A-2. 상태/React (렌더링, 훅, 상태 설계)

React의 상태 관리와 렌더링 최적화에 대한 핵심 지식을 상황별로 정리합니다.

## 📋 체크리스트 항목

### 1. useEffect 의존성/무한 루프

#### Lv1: 설명 가능

**학습 목표**: 의존성 배열과 stale closure를 설명할 수 있습니다.

**핵심 개념**:

- **의존성 배열 (Dependency Array)**: useEffect가 언제 실행될지 결정하는 배열
- **Stale Closure**: 오래된 클로저로 인해 최신 값을 참조하지 못하는 문제
- **Effect 실행 시점**:
  - 마운트 시 (의존성 배열 없음)
  - 업데이트 시 (의존성 배열 값 변경)
  - 언마운트 시 (cleanup 함수)

**Stale Closure 예제**:

```javascript
// ❌ 문제: count가 항상 초기값(0)을 참조
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1); // count는 항상 0
    }, 1000);
    return () => clearInterval(interval);
  }, []); // 의존성 배열이 비어있음

  return <div>{count}</div>;
}

// ✅ 해결: 함수형 업데이트 사용
useEffect(() => {
  const interval = setInterval(() => {
    setCount((prev) => prev + 1); // 최신 값 참조
  }, 1000);
  return () => clearInterval(interval);
}, []);
```

**학습 자료**:

- [React 공식 문서 - useEffect](https://react.dev/reference/react/useEffect)
- [React 공식 문서 - 의존성 배열](https://react.dev/learn/lifecycle-of-reactive-effects#what-are-reactive-values)

#### Lv2: 실습 경험

**학습 목표**: 의존성을 올바르게 구성하고 불필요한 effect를 줄여본 적이 있습니다.

**실습 과제**:

1. **의존성 배열 올바르게 작성**:

   ```javascript
   // ❌ 나쁜 예: 의존성 누락
   useEffect(() => {
     fetchData(userId); // userId가 변경되어도 실행 안 됨
   }, []);

   // ✅ 좋은 예: 모든 의존성 포함
   useEffect(() => {
     fetchData(userId);
   }, [userId]);
   ```

2. **불필요한 effect 제거**:
   - Derived state는 effect 대신 직접 계산
   - 이벤트 핸들러로 처리 가능한 것은 effect에서 제거
3. **ESLint 규칙 활용**: `react-hooks/exhaustive-deps` 규칙 사용

**예제 코드**:

```javascript
// ❌ 불필요한 effect
function UserProfile({ user }) {
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    setFullName(`${user.firstName} ${user.lastName}`);
  }, [user]);

  return <div>{fullName}</div>;
}

// ✅ Derived state로 직접 계산
function UserProfile({ user }) {
  const fullName = `${user.firstName} ${user.lastName}`;
  return <div>{fullName}</div>;
}
```

**실습 체크리스트**:

- [ ] 의존성 배열 올바르게 작성
- [ ] Stale closure 문제 해결
- [ ] 불필요한 effect 제거
- [ ] ESLint 규칙 적용

#### Lv3: 실무 해결 경험

**학습 목표**: 실서비스에서 무한 루프/경합(race) 문제를 추적하여 해결해본 적이 있습니다.

**실무 시나리오**:

- 무한 루프로 인한 성능 저하
- Race condition으로 인한 잘못된 상태
- 메모리 누수 (cleanup 함수 누락)

**디버깅 프로세스**:

1. **문제 재현**: 무한 루프 발생 조건 확인
2. **로그 추가**: useEffect 실행 시점과 값 추적
3. **원인 분석**:
   - 의존성 배열에 객체/배열이 포함되어 있는지 확인
   - effect 내부에서 상태를 변경하는지 확인
4. **해결책 적용**:
   - useMemo/useCallback으로 의존성 안정화
   - 함수형 업데이트 사용
   - cleanup 함수 추가
5. **검증**: 무한 루프 해결 및 성능 개선 확인

**예제 코드**:

```javascript
// ❌ 무한 루프 발생
function Component({ userId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData(userId).then(setData);
  }, [data]); // data가 변경되면 다시 실행 → 무한 루프

  return <div>{data}</div>;
}

// ✅ 해결: 의존성 수정
useEffect(() => {
  fetchData(userId).then(setData);
}, [userId]); // userId만 의존성으로
```

**도구**:

- React DevTools Profiler
- Chrome DevTools Performance
- ESLint react-hooks 규칙

---

### 2. 리렌더 과다

#### Lv1: 설명 가능

**학습 목표**: 리렌더가 발생하는 조건을 설명할 수 있습니다.

**리렌더 발생 조건**:

1. **상태 변경**: `useState`, `useReducer`로 상태 변경
2. **Props 변경**: 부모 컴포넌트에서 전달받은 props 변경
3. **컨텍스트 변경**: `useContext`로 구독한 컨텍스트 값 변경
4. **부모 리렌더**: 부모가 리렌더되면 자식도 리렌더 (기본 동작)

**리렌더 최적화 방법**:

- `React.memo`: Props가 변경되지 않으면 리렌더 방지
- `useMemo`: 값 메모이제이션
- `useCallback`: 함수 메모이제이션
- 상태 구조 최적화: 불필요한 리렌더 유발 상태 분리

**학습 자료**:

- [React 공식 문서 - 메모이제이션](https://react.dev/reference/react/memo)
- [React 공식 문서 - useMemo](https://react.dev/reference/react/useMemo)
- [React 공식 문서 - useCallback](https://react.dev/reference/react/useCallback)

#### Lv2: 실습 경험

**학습 목표**: 메모이제이션(useMemo/useCallback/memo)을 목적에 맞게 적용해본 적이 있습니다.

**실습 과제**:

1. **React.memo 적용**:
   ```javascript
   // ✅ Props가 변경되지 않으면 리렌더 방지
   const ExpensiveComponent = React.memo(({ data }) => {
     return <div>{/* 복잡한 렌더링 */}</div>;
   });
   ```
2. **useMemo 적용**: 비용이 큰 계산 결과 메모이제이션
   ```javascript
   const expensiveValue = useMemo(() => {
     return heavyCalculation(data);
   }, [data]);
   ```
3. **useCallback 적용**: 자식 컴포넌트에 전달하는 함수 메모이제이션
   ```javascript
   const handleClick = useCallback(() => {
     doSomething(id);
   }, [id]);
   ```

**주의사항**:

- 메모이제이션 자체도 비용이 있으므로 남용 금지
- 실제 성능 문제가 있을 때만 적용
- Profiler로 측정 후 적용

**실습 체크리스트**:

- [ ] React.memo 적용
- [ ] useMemo 적용
- [ ] useCallback 적용
- [ ] Profiler로 성능 측정

#### Lv3: 실무 해결 경험

**학습 목표**: React Profiler로 병목을 확인하고 개선을 검증해본 적이 있습니다.

**실무 시나리오**:

- 리스트 렌더링 시 성능 저하
- 폼 입력 시 버벅임
- 대시보드 렌더링 지연

**최적화 프로세스**:

1. **프로파일링**: React DevTools Profiler로 기록
2. **병목 식별**:
   - 렌더링 시간이 긴 컴포넌트 확인
   - 불필요한 리렌더 확인
3. **최적화 적용**:
   - 메모이제이션 적용
   - 상태 구조 개선
   - 컴포넌트 분리
4. **검증**: Before/After 비교 측정

**예제 코드**:

```javascript
// ❌ 성능 문제
function List({ items }) {
  return (
    <div>
      {items.map((item) => (
        <ExpensiveItem key={item.id} item={item} />
      ))}
    </div>
  );
}

// ✅ 최적화: React.memo 적용
const ExpensiveItem = React.memo(({ item }) => {
  return <div>{/* 복잡한 렌더링 */}</div>;
});
```

**도구**:

- React DevTools Profiler
- Chrome DevTools Performance
- Why Did You Render (개발 모드)

---

### 3. 상태 경계(로컬/전역/서버 상태)

#### Lv1: 설명 가능

**학습 목표**: 로컬/전역/서버 상태를 구분하는 기준을 설명할 수 있습니다.

**상태 분류**:

1. **로컬 상태 (Local State)**:

   - 컴포넌트 내부에서만 사용
   - `useState`, `useReducer` 사용
   - 예: 입력 필드 값, 모달 열림/닫힘

2. **전역 상태 (Global State)**:

   - 여러 컴포넌트에서 공유
   - Context API, Redux, Zustand 등 사용
   - 예: 사용자 인증 정보, 테마 설정

3. **서버 상태 (Server State)**:
   - 서버에서 가져온 데이터
   - TanStack Query, SWR 등 사용
   - 예: API 응답 데이터, 캐시된 데이터

**선택 기준**:

- **로컬**: 단일 컴포넌트에서만 사용
- **전역**: 여러 컴포넌트에서 공유 필요
- **서버**: 서버에서 가져온 데이터 (캐싱, 동기화 필요)

**학습 자료**:

- [TanStack Query 공식 문서](https://tanstack.com/query/latest)
- [React 공식 문서 - Context](https://react.dev/reference/react/useContext)

#### Lv2: 실습 경험

**학습 목표**: 서버 상태 캐싱/동기화(예: TanStack Query)를 적용해본 적이 있습니다.

**실습 과제**:

1. **TanStack Query 설정**:

   ```javascript
   import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

   const queryClient = new QueryClient();

   function App() {
     return (
       <QueryClientProvider client={queryClient}>
         <YourApp />
       </QueryClientProvider>
     );
   }
   ```

2. **데이터 페칭**:
   ```javascript
   function UserProfile({ userId }) {
     const { data, isLoading, error } = useQuery({
       queryKey: ["user", userId],
       queryFn: () => fetchUser(userId),
     });

     if (isLoading) return <div>Loading...</div>;
     if (error) return <div>Error: {error.message}</div>;
     return <div>{data.name}</div>;
   }
   ```
3. **캐시 관리**: `staleTime`, `cacheTime` 설정
4. **동기화**: `refetchOnWindowFocus`, `refetchOnReconnect` 설정

**실습 체크리스트**:

- [ ] TanStack Query 설정
- [ ] 데이터 페칭 구현
- [ ] 캐시 설정
- [ ] 동기화 설정

#### Lv3: 실무 해결 경험

**학습 목표**: 전역 상태 과다/props drilling을 구조적으로 개선해본 적이 있습니다.

**실무 시나리오**:

- Props drilling으로 인한 복잡도 증가
- 전역 상태 과다 사용으로 인한 불필요한 리렌더
- 상태 관리 구조가 복잡해짐

**개선 방법**:

1. **상태 위치 최적화**:
   - 필요한 최소 범위로 상태 이동
   - 컴포넌트 트리 구조 재설계
2. **Context 분리**:
   - 하나의 큰 Context 대신 여러 작은 Context 사용
   - 관련된 상태만 함께 묶기
3. **상태 관리 라이브러리 선택**:
   - Redux: 복잡한 상태 관리 필요 시
   - Zustand: 간단한 전역 상태 필요 시
   - TanStack Query: 서버 상태 관리

**예제 코드**:

```javascript
// ❌ Props drilling
function App() {
  const [user, setUser] = useState(null);
  return <Page user={user} setUser={setUser} />;
}

function Page({ user, setUser }) {
  return <Header user={user} setUser={setUser} />;
}

function Header({ user, setUser }) {
  return <UserMenu user={user} setUser={setUser} />;
}

// ✅ Context 사용
const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Page />
    </UserContext.Provider>
  );
}
```

**도구**:

- React DevTools
- 상태 관리 라이브러리 (Redux DevTools 등)

---

### 4. 리스트 key/입력값 튐

#### Lv1: 설명 가능

**학습 목표**: key 안정성이 중요한 이유를 설명할 수 있습니다.

**Key의 역할**:

- React가 요소를 식별하는 데 사용
- 리렌더 시 어떤 요소가 변경되었는지 판단
- Virtual DOM diffing 알고리즘에 사용

**Key 안정성**:

- **안정적인 key**: 리스트 순서가 바뀌어도 동일한 요소 식별
- **불안정한 key**: 인덱스 사용 시 순서 변경 시 문제 발생

**문제 상황**:

```javascript
// ❌ 나쁜 예: 인덱스를 key로 사용
{
  items.map((item, index) => <Item key={index} item={item} />);
}

// ✅ 좋은 예: 고유 ID 사용
{
  items.map((item) => <Item key={item.id} item={item} />);
}
```

**학습 자료**:

- [React 공식 문서 - 리스트와 Key](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)

#### Lv2: 실습 경험

**학습 목표**: 안정적인 key 전략을 적용해본 적이 있습니다.

**실습 과제**:

1. **고유 ID 사용**:
   ```javascript
   {
     items.map((item) => <Item key={item.id} item={item} />);
   }
   ```
2. **복합 key 사용** (ID가 없는 경우):
   ```javascript
   {
     items.map((item) => (
       <Item key={`${item.category}-${item.name}`} item={item} />
     ));
   }
   ```
3. **입력값 튐 문제 해결**:
   - key가 변경되면 컴포넌트가 언마운트/마운트됨
   - 입력 필드의 경우 key 변경 시 값이 초기화됨

**실습 체크리스트**:

- [ ] 고유 ID를 key로 사용
- [ ] 복합 key 사용 (필요 시)
- [ ] 입력값 튐 문제 해결

#### Lv3: 실무 해결 경험

**학습 목표**: 실제 버그를 재현/수정/회귀 방지까지 해본 적이 있습니다.

**실무 시나리오**:

- 리스트 정렬/필터링 시 입력값이 튐
- 아이템 추가/삭제 시 포커스가 이동함
- 동적 리스트에서 상태가 유지되지 않음

**해결 프로세스**:

1. **버그 재현**: 문제 발생 조건 확인
2. **원인 분석**: key가 불안정한지 확인
3. **해결책 적용**: 안정적인 key 사용
4. **회귀 방지**:
   - ESLint 규칙 추가 (`react/jsx-key`)
   - 코드 리뷰 체크리스트에 추가
   - 테스트 작성

**예제 코드**:

```javascript
// ❌ 문제: 필터링 시 입력값이 튐
function FilterableList({ items }) {
  const [filter, setFilter] = useState("");
  const filtered = items.filter((item) => item.name.includes(filter));

  return (
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      {filtered.map((item, index) => (
        <input key={index} defaultValue={item.name} />
      ))}
    </div>
  );
}

// ✅ 해결: 안정적인 key 사용
{
  filtered.map((item) => <input key={item.id} defaultValue={item.name} />);
}
```

**도구**:

- React DevTools
- ESLint react/jsx-key 규칙

---

## 📚 추가 학습 자료

### 공식 문서

- [React 공식 문서 - useEffect](https://react.dev/reference/react/useEffect)
- [React 공식 문서 - 메모이제이션](https://react.dev/reference/react/memo)
- [React 공식 문서 - 리스트와 Key](https://react.dev/learn/rendering-lists)
- [TanStack Query 공식 문서](https://tanstack.com/query/latest)

### 도구

- React DevTools
- React DevTools Profiler
- ESLint react-hooks 규칙

### 실습 프로젝트 아이디어

1. **성능 최적화 프로젝트**: 리렌더 최적화 적용
2. **상태 관리 리팩토링**: 상태 경계 재설계
3. **버그 수정 프로젝트**: key 관련 버그 수정
