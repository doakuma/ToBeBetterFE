# A-3. API/네트워크 (데이터 페칭, 캐시, 오류)

API 호출과 네트워크 관련 핵심 지식을 상황별로 정리합니다.

## 📋 체크리스트 항목

### 1. 로딩/에러/빈 상태 처리

#### Lv1: 설명 가능
**학습 목표**: 사용자 경험 관점에서 세 상태의 필요성을 설명할 수 있습니다.

**세 가지 상태**:
1. **로딩 상태 (Loading)**: 데이터를 가져오는 중임을 사용자에게 알림
2. **에러 상태 (Error)**: 요청이 실패했음을 알리고 재시도 옵션 제공
3. **빈 상태 (Empty)**: 데이터가 없음을 명확히 표시

**필요성**:
- **로딩**: 사용자가 무한 대기로 느끼지 않도록 피드백 제공
- **에러**: 문제 상황을 명확히 전달하고 해결 방법 제시
- **빈 상태**: "데이터가 없다"와 "로딩 중"을 구분

**학습 자료**:
- [Web.dev - 로딩 상태](https://web.dev/loading-state/)
- [Material Design - Empty States](https://material.io/design/communication/empty-states.html)

#### Lv2: 실습 경험
**학습 목표**: 화면에서 일관된 상태 처리 패턴을 구현해본 적이 있습니다.

**실습 과제**:
1. **로딩 상태 구현**:
   ```javascript
   function DataList() {
     const { data, isLoading, error } = useQuery({
       queryKey: ['items'],
       queryFn: fetchItems,
     });
     
     if (isLoading) return <LoadingSpinner />;
     if (error) return <ErrorMessage error={error} />;
     if (!data || data.length === 0) return <EmptyState />;
     
     return <List items={data} />;
   }
   ```
2. **에러 상태 구현**: 에러 메시지 표시 및 재시도 버튼
3. **빈 상태 구현**: 의미 있는 메시지와 액션 제공

**일관된 패턴**:
- 모든 데이터 페칭에 동일한 패턴 적용
- 재사용 가능한 컴포넌트로 추상화
- 디자인 시스템과 일관성 유지

**실습 체크리스트**:
- [ ] 로딩 상태 구현
- [ ] 에러 상태 구현
- [ ] 빈 상태 구현
- [ ] 일관된 패턴 적용

#### Lv3: 실무 해결 경험
**학습 목표**: 장애 상황에서 사용자 영향 최소화 UX까지 설계/개선해본 적이 있습니다.

**실무 시나리오**:
- API 장애 시 사용자 경험 저하
- 네트워크 불안정 환경 대응
- 부분 실패 처리 (일부 데이터는 성공, 일부는 실패)

**개선 방법**:
1. **Fallback 데이터**: 캐시된 데이터 표시
2. **부분 로딩**: 일부 데이터라도 먼저 표시
3. **재시도 전략**: 자동 재시도 및 수동 재시도 옵션
4. **오프라인 지원**: Service Worker로 오프라인 대응

**예제 코드**:
```javascript
function ResilientDataList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
    retry: 3,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
  
  // 캐시된 데이터가 있으면 표시
  const cachedData = queryClient.getQueryData(['items']);
  const displayData = data || cachedData;
  
  if (isLoading && !displayData) return <LoadingSpinner />;
  if (error && !displayData) return <ErrorMessage error={error} />;
  if (!displayData || displayData.length === 0) return <EmptyState />;
  
  return (
    <div>
      {error && <WarningBanner message="일부 데이터를 불러오지 못했습니다." />}
      <List items={displayData} />
    </div>
  );
}
```

**도구**:
- TanStack Query
- Service Worker
- 오프라인 감지 API

---

### 2. 요청 취소/중복 요청 방지

#### Lv1: 설명 가능
**학습 목표**: AbortController 및 경합 문제를 설명할 수 있습니다.

**AbortController**:
- 요청을 취소할 수 있게 해주는 Web API
- `signal`을 통해 취소 신호 전달
- 컴포넌트 언마운트 시 불필요한 요청 취소에 유용

**경합 문제 (Race Condition)**:
- 여러 요청이 동시에 발생할 때 응답 순서가 보장되지 않음
- 나중에 보낸 요청이 먼저 도착할 수 있음
- 잘못된 데이터가 표시될 수 있음

**학습 자료**:
- [MDN - AbortController](https://developer.mozilla.org/ko/docs/Web/API/AbortController)
- [Web.dev - 요청 취소](https://web.dev/cancel-a-fetch-request/)

#### Lv2: 실습 경험
**학습 목표**: 라우트 이동/입력 변경 중 요청 취소를 적용해본 적이 있습니다.

**실습 과제**:
1. **AbortController 사용**:
   ```javascript
   useEffect(() => {
     const controller = new AbortController();
     
     fetch('/api/data', { signal: controller.signal })
       .then(response => response.json())
       .then(data => setData(data))
       .catch(error => {
         if (error.name !== 'AbortError') {
           console.error(error);
         }
       });
     
     return () => controller.abort();
   }, []);
   ```
2. **입력 디바운싱**: 입력 변경 시 이전 요청 취소
3. **라우트 이동 시 취소**: React Router와 연동

**예제 코드**:
```javascript
function SearchInput() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      fetch(`/api/search?q=${query}`, { signal: controller.signal })
        .then(res => res.json())
        .then(data => setResults(data))
        .catch(error => {
          if (error.name !== 'AbortError') {
            console.error(error);
          }
        });
    }, 300); // 디바운싱
    
    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [query]);
  
  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ResultsList results={results} />
    </div>
  );
}
```

**실습 체크리스트**:
- [ ] AbortController 사용
- [ ] 디바운싱 구현
- [ ] 라우트 이동 시 취소
- [ ] 에러 처리 (AbortError 제외)

#### Lv3: 실무 해결 경험
**학습 목표**: 중복 요청/경합으로 인한 데이터 오염을 실무에서 해결해본 적이 있습니다.

**실무 시나리오**:
- 빠른 클릭으로 인한 중복 요청
- 검색어 변경 시 이전 요청 응답이 나중에 도착
- 페이지 이동 후 이전 페이지 요청 응답 처리

**해결 방법**:
1. **요청 ID 사용**: 각 요청에 고유 ID 부여, 최신 요청만 처리
2. **TanStack Query 활용**: 자동으로 중복 요청 방지 및 취소 처리
3. **요청 큐 관리**: 동일한 요청은 하나만 실행

**예제 코드**:
```javascript
// 요청 ID를 사용한 경합 방지
function useSafeFetch() {
  const requestIdRef = useRef(0);
  
  const safeFetch = useCallback(async (url) => {
    const currentRequestId = ++requestIdRef.current;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      // 최신 요청인지 확인
      if (currentRequestId === requestIdRef.current) {
        return data;
      }
      // 오래된 요청이면 무시
      return null;
    } catch (error) {
      if (currentRequestId === requestIdRef.current) {
        throw error;
      }
      return null;
    }
  }, []);
  
  return safeFetch;
}

// TanStack Query 사용 (권장)
function DataComponent() {
  const { data } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
    staleTime: 1000, // 1초간 중복 요청 방지
  });
  
  return <div>{data}</div>;
}
```

**도구**:
- TanStack Query
- Axios (취소 토큰 지원)
- Custom Hook 패턴

---

### 3. CORS / preflight

#### Lv1: 설명 가능
**학습 목표**: CORS와 preflight가 발생하는 조건을 설명할 수 있습니다.

**CORS (Cross-Origin Resource Sharing)**:
- 브라우저의 동일 출처 정책(Same-Origin Policy)을 우회하는 메커니즘
- 다른 도메인으로 요청을 보낼 때 필요

**Preflight 요청**:
- 실제 요청 전에 OPTIONS 메서드로 보내는 사전 요청
- 서버가 해당 요청을 허용하는지 확인

**Preflight 발생 조건**:
1. **복잡한 요청**:
   - PUT, DELETE, PATCH 메서드
   - 커스텀 헤더
   - `Content-Type: application/json`
2. **단순 요청** (Preflight 없음):
   - GET, HEAD, POST
   - 허용된 헤더만 사용
   - `Content-Type: application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`

**학습 자료**:
- [MDN - CORS](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)
- [Web.dev - CORS](https://web.dev/cross-origin-resource-sharing/)

#### Lv2: 실습 경험
**학습 목표**: 개발 환경에서 CORS 문제를 원인 파악하고 해결해본 적이 있습니다.

**실습 과제**:
1. **CORS 에러 확인**: 브라우저 콘솔에서 CORS 에러 메시지 확인
2. **서버 설정 확인**: 서버의 CORS 헤더 설정 확인
3. **프록시 설정**: 개발 환경에서 프록시로 우회
4. **해결 방법 적용**:
   - 서버에서 CORS 헤더 추가
   - 개발 환경 프록시 설정

**예제 코드**:
```javascript
// 서버 측 CORS 설정 (Express 예제)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Vite 프록시 설정 (vite.config.js)
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
};
```

**실습 체크리스트**:
- [ ] CORS 에러 재현
- [ ] 원인 파악
- [ ] 서버 설정 또는 프록시 설정
- [ ] 해결 확인

#### Lv3: 실무 해결 경험
**학습 목표**: 배포 환경에서 프록시/헤더/캐시까지 고려하여 안정적으로 해결해본 적이 있습니다.

**실무 시나리오**:
- 개발 환경에서는 작동하지만 프로덕션에서 CORS 에러
- Preflight 요청이 캐시되어 문제 발생
- 여러 도메인에서 접근해야 하는 경우

**해결 방법**:
1. **서버 설정**:
   ```javascript
   // 동적 Origin 허용
   const allowedOrigins = ['https://app.example.com', 'https://admin.example.com'];
   
   app.use((req, res, next) => {
     const origin = req.headers.origin;
     if (allowedOrigins.includes(origin)) {
       res.header('Access-Control-Allow-Origin', origin);
     }
     res.header('Access-Control-Allow-Credentials', 'true');
     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
     res.header('Access-Control-Max-Age', '86400'); // Preflight 캐시 시간
     
     if (req.method === 'OPTIONS') {
       return res.sendStatus(200);
     }
     next();
   });
   ```
2. **CDN/프록시 설정**: Cloudflare, Nginx 등에서 CORS 헤더 추가
3. **캐시 고려**: Preflight 캐시 시간 설정

**도구**:
- 브라우저 DevTools Network 탭
- 서버 로그
- CORS 테스트 도구

---

### 4. 캐시/신선도

#### Lv1: 설명 가능
**학습 목표**: Cache-Control, ETag 개념을 설명할 수 있습니다.

**HTTP 캐싱**:
- 브라우저와 서버 간의 캐시 메커니즘
- 불필요한 네트워크 요청 감소
- 성능 향상

**Cache-Control 헤더**:
- `max-age`: 캐시 유지 시간 (초)
- `no-cache`: 캐시 사용 전 서버에 검증 필요
- `no-store`: 캐시 저장 금지
- `private`: 브라우저만 캐시 가능
- `public`: 모든 중간 캐시 가능

**ETag**:
- 리소스의 버전을 나타내는 식별자
- 변경되지 않았으면 304 Not Modified 응답
- 네트워크 대역폭 절약

**학습 자료**:
- [MDN - HTTP 캐싱](https://developer.mozilla.org/ko/docs/Web/HTTP/Caching)
- [Web.dev - HTTP 캐싱](https://web.dev/http-cache/)

#### Lv2: 실습 경험
**학습 목표**: 캐시로 인한 최신 데이터 문제를 회피/개선해본 적이 있습니다.

**실습 과제**:
1. **캐시 헤더 확인**: 브라우저 DevTools에서 캐시 헤더 확인
2. **캐시 무효화**: 
   - 쿼리 파라미터 추가 (`?v=123`)
   - 파일명에 해시 추가 (`app.abc123.js`)
3. **조건부 요청**: ETag/Last-Modified 사용
4. **캐시 전략 설정**: 정적 자산과 API 데이터 구분

**예제 코드**:
```javascript
// API 요청에 캐시 방지 헤더 추가
fetch('/api/data', {
  headers: {
    'Cache-Control': 'no-cache',
  },
});

// TanStack Query에서 캐시 설정
const { data } = useQuery({
  queryKey: ['data'],
  queryFn: fetchData,
  staleTime: 5 * 60 * 1000, // 5분간 신선한 데이터로 간주
  cacheTime: 10 * 60 * 1000, // 10분간 캐시 유지
});
```

**실습 체크리스트**:
- [ ] 캐시 헤더 확인
- [ ] 캐시 무효화 방법 적용
- [ ] 조건부 요청 구현
- [ ] 캐시 전략 설정

#### Lv3: 실무 해결 경험
**학습 목표**: 성능과 신선도 균형을 지표 기반으로 운영해본 적이 있습니다.

**실무 시나리오**:
- 캐시로 인한 오래된 데이터 표시
- 캐시 없음으로 인한 성능 저하
- 사용자별로 다른 캐시 전략 필요

**최적화 방법**:
1. **캐시 전략 수립**:
   - 정적 자산: 긴 캐시 시간 + 파일명 해시
   - API 데이터: 짧은 캐시 시간 + 재검증
   - 사용자별 데이터: 캐시하지 않음
2. **지표 모니터링**:
   - 캐시 히트율
   - 네트워크 요청 수
   - 데이터 신선도
3. **A/B 테스트**: 다른 캐시 전략 비교

**예제 코드**:
```javascript
// 계층적 캐시 전략
const cacheConfig = {
  // 정적 데이터: 1시간 캐시
  static: {
    staleTime: 60 * 60 * 1000,
    cacheTime: 24 * 60 * 60 * 1000,
  },
  // 동적 데이터: 5분 캐시
  dynamic: {
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  },
  // 실시간 데이터: 캐시 없음
  realtime: {
    staleTime: 0,
    cacheTime: 0,
  },
};
```

**도구**:
- Chrome DevTools Network 탭
- Lighthouse
- 캐시 분석 도구

---

## 📚 추가 학습 자료

### 공식 문서
- [MDN - AbortController](https://developer.mozilla.org/ko/docs/Web/API/AbortController)
- [MDN - CORS](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)
- [MDN - HTTP 캐싱](https://developer.mozilla.org/ko/docs/Web/HTTP/Caching)
- [TanStack Query 공식 문서](https://tanstack.com/query/latest)

### 도구
- Chrome DevTools Network
- TanStack Query
- Axios

### 실습 프로젝트 아이디어
1. **API 클라이언트 라이브러리**: 요청 취소, 재시도, 캐싱 포함
2. **에러 처리 시스템**: 일관된 에러 처리 패턴 구현
3. **캐시 최적화 프로젝트**: 성능과 신선도 균형 맞추기
