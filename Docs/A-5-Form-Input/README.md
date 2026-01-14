# A-5. 폼/입력 (검증, 업로드, 엣지 케이스)

폼과 입력 처리 관련 핵심 지식을 상황별로 정리합니다.

## 📋 체크리스트 항목

### 1. controlled/uncontrolled 및 검증

#### Lv1: 설명 가능
**학습 목표**: 두 방식의 차이와 선택 기준을 설명할 수 있습니다.

**Controlled Component**:
- React가 입력값을 제어하는 방식
- `value` prop과 `onChange` 핸들러 사용
- 상태를 React에서 관리
- 실시간 검증 및 제어 가능

**Uncontrolled Component**:
- DOM이 입력값을 제어하는 방식
- `ref`를 사용하여 값 접근
- 상태를 DOM에서 관리
- 성능상 이점 (리렌더 감소)

**선택 기준**:
- **Controlled**: 실시간 검증, 조건부 렌더링, 복잡한 로직 필요 시
- **Uncontrolled**: 단순한 폼, 성능 최적화 필요 시, 서드파티 라이브러리와 통합 시

**학습 자료**:
- [React 공식 문서 - Controlled Components](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)
- [React 공식 문서 - Uncontrolled Components](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-ref)

#### Lv2: 실습 경험
**학습 목표**: 클라이언트/서버 validation을 함께 구성해본 적이 있습니다.

**실습 과제**:
1. **Controlled Component 구현**:
   ```javascript
   function Form() {
     const [email, setEmail] = useState('');
     const [error, setError] = useState('');
     
     const handleChange = (e) => {
       const value = e.target.value;
       setEmail(value);
       
       // 실시간 검증
       if (!value.includes('@')) {
         setError('올바른 이메일 형식이 아닙니다.');
       } else {
         setError('');
       }
     };
     
     return (
       <div>
         <input value={email} onChange={handleChange} />
         {error && <span>{error}</span>}
       </div>
     );
   }
   ```
2. **서버 검증 통합**:
   ```javascript
   const handleSubmit = async (e) => {
     e.preventDefault();
     
     try {
       const response = await fetch('/api/submit', {
         method: 'POST',
         body: JSON.stringify({ email }),
       });
       
       if (!response.ok) {
         const errors = await response.json();
         setServerErrors(errors);
       }
     } catch (error) {
       console.error(error);
     }
   };
   ```
3. **검증 라이브러리 사용**: react-hook-form, Formik 등

**실습 체크리스트**:
- [ ] Controlled Component 구현
- [ ] 실시간 검증 구현
- [ ] 서버 검증 통합
- [ ] 에러 메시지 표시

#### Lv3: 실무 해결 경험
**학습 목표**: 복잡한 폼(다단계/동적 필드)에서 안정적으로 운영해본 적이 있습니다.

**실무 시나리오**:
- 다단계 폼 (회원가입, 주문 등)
- 동적 필드 추가/제거
- 조건부 필드 표시
- 폼 상태 복원 (뒤로가기, 새로고침)

**해결 방법**:
1. **폼 상태 관리**: react-hook-form, Formik 등 사용
2. **다단계 폼**: 각 단계별 상태 관리 및 검증
3. **동적 필드**: 배열 상태로 관리, 고유 key 사용
4. **상태 복원**: localStorage 또는 URL 파라미터 활용

**예제 코드**:
```javascript
import { useForm, useFieldArray } from 'react-hook-form';

function MultiStepForm() {
  const { register, control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`items.${index}.name`)} />
          <button type="button" onClick={() => remove(index)}>
            삭제
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: '' })}>
        추가
      </button>
    </form>
  );
}
```

**도구**:
- react-hook-form
- Formik
- Yup (검증 스키마)

---

### 2. 파일 업로드

#### Lv1: 설명 가능
**학습 목표**: 파일 업로드에서 UX(프로그레스/취소/검증)가 중요한 이유를 설명할 수 있습니다.

**UX 중요성**:
1. **프로그레스 표시**: 사용자가 진행 상황을 알 수 있도록
2. **취소 기능**: 잘못 선택한 파일 취소 가능
3. **검증**: 파일 크기, 형식 등 사전 검증
4. **에러 처리**: 업로드 실패 시 명확한 메시지

**학습 자료**:
- [MDN - File API](https://developer.mozilla.org/ko/docs/Web/API/File)
- [Web.dev - 파일 업로드](https://web.dev/read-files/)

#### Lv2: 실습 경험
**학습 목표**: progress 표시, 취소, 실패 재시도 UX를 구현해본 적이 있습니다.

**실습 과제**:
1. **파일 선택 및 미리보기**:
   ```javascript
   function FileUpload() {
     const [file, setFile] = useState(null);
     const [preview, setPreview] = useState(null);
     
     const handleFileChange = (e) => {
       const selectedFile = e.target.files[0];
       setFile(selectedFile);
       
       // 이미지 미리보기
       if (selectedFile && selectedFile.type.startsWith('image/')) {
         const reader = new FileReader();
         reader.onloadend = () => setPreview(reader.result);
         reader.readAsDataURL(selectedFile);
       }
     };
     
     return (
       <div>
         <input type="file" onChange={handleFileChange} />
         {preview && <img src={preview} alt="Preview" />}
       </div>
     );
   }
   ```
2. **업로드 진행률 표시**:
   ```javascript
   const [progress, setProgress] = useState(0);
   
   const uploadFile = async (file) => {
     const xhr = new XMLHttpRequest();
     
     xhr.upload.addEventListener('progress', (e) => {
       if (e.lengthComputable) {
         const percentComplete = (e.loaded / e.total) * 100;
         setProgress(percentComplete);
       }
     });
     
     xhr.open('POST', '/api/upload');
     const formData = new FormData();
     formData.append('file', file);
     xhr.send(formData);
   };
   ```
3. **취소 기능**: AbortController 사용
4. **재시도 기능**: 실패 시 재시도 버튼 제공

**실습 체크리스트**:
- [ ] 파일 선택 및 미리보기
- [ ] 업로드 진행률 표시
- [ ] 취소 기능 구현
- [ ] 재시도 기능 구현

#### Lv3: 실무 해결 경험
**학습 목표**: 대용량/모바일/네트워크 불안정 환경 이슈를 해결해본 적이 있습니다.

**실무 시나리오**:
- 대용량 파일 업로드 시 타임아웃
- 모바일에서 메모리 부족
- 네트워크 불안정으로 인한 업로드 실패

**해결 방법**:
1. **청크 업로드**: 대용량 파일을 작은 조각으로 나누어 업로드
2. **재시도 로직**: 네트워크 오류 시 자동 재시도
3. **압축**: 이미지 압축 후 업로드
4. **백그라운드 업로드**: Service Worker 활용

**예제 코드**:
```javascript
async function uploadLargeFile(file) {
  const chunkSize = 1024 * 1024; // 1MB
  const totalChunks = Math.ceil(file.size / chunkSize);
  
  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);
    
    const formData = new FormData();
    formData.append('chunk', chunk);
    formData.append('chunkIndex', i);
    formData.append('totalChunks', totalChunks);
    formData.append('fileName', file.name);
    
    await fetch('/api/upload-chunk', {
      method: 'POST',
      body: formData,
    });
    
    setProgress(((i + 1) / totalChunks) * 100);
  }
}
```

**도구**:
- File API
- XMLHttpRequest / Fetch API
- Service Worker

---

### 3. IME/모바일 입력

#### Lv1: 설명 가능
**학습 목표**: IME 입력에서 발생할 수 있는 이벤트/상태 이슈를 설명할 수 있습니다.

**IME (Input Method Editor)**:
- 한글, 일본어, 중국어 등 복합 문자 입력을 위한 시스템
- 여러 키 입력을 조합하여 하나의 문자 생성

**문제 상황**:
1. **이벤트 타이밍**: `onChange`가 중간 입력 상태에서도 발생
2. **컴포지션 이벤트**: `compositionstart`, `compositionupdate`, `compositionend`
3. **입력값 튐**: 중간 입력 상태에서 검증/제어 시 문제 발생

**학습 자료**:
- [MDN - CompositionEvent](https://developer.mozilla.org/ko/docs/Web/API/CompositionEvent)
- [React GitHub - IME 이슈](https://github.com/facebook/react/issues/3926)

#### Lv2: 실습 경험
**학습 목표**: 관련 버그를 재현하고 우회/개선해본 적이 있습니다.

**실습 과제**:
1. **IME 이벤트 처리**:
   ```javascript
   function InputWithIME() {
     const [value, setValue] = useState('');
     const [isComposing, setIsComposing] = useState(false);
     
     const handleCompositionStart = () => {
       setIsComposing(true);
     };
     
     const handleCompositionEnd = (e) => {
       setIsComposing(false);
       setValue(e.target.value);
     };
     
     const handleChange = (e) => {
       if (!isComposing) {
         setValue(e.target.value);
       }
     };
     
     return (
       <input
         value={value}
         onChange={handleChange}
         onCompositionStart={handleCompositionStart}
         onCompositionEnd={handleCompositionEnd}
       />
     );
   }
   ```
2. **모바일 입력 이슈**: 
   - 가상 키보드로 인한 레이아웃 변경
   - `inputmode` 속성 사용
   - `autocomplete` 속성 활용

**실습 체크리스트**:
- [ ] IME 이벤트 처리 구현
- [ ] 모바일 입력 최적화
- [ ] 입력값 튐 문제 해결

#### Lv3: 실무 해결 경험
**학습 목표**: 다양한 디바이스/브라우저에서 회귀 테스트까지 해본 적이 있습니다.

**실무 시나리오**:
- 한글 입력 시 검색어가 중간에 제출됨
- 모바일에서 입력 필드가 가상 키보드에 가려짐
- iOS Safari와 Android Chrome에서 동작 차이

**해결 방법**:
1. **IME 처리**: `isComposing` 상태로 중간 입력 무시
2. **모바일 레이아웃**: 가상 키보드 높이 고려한 레이아웃
3. **크로스 브라우저 테스트**: 주요 브라우저/디바이스에서 테스트

**예제 코드**:
```javascript
// IME 안전한 검색 구현
function SearchInput() {
  const [query, setQuery] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  
  const handleSearch = useCallback(() => {
    if (!isComposing && query.trim()) {
      performSearch(query);
    }
  }, [query, isComposing]);
  
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onCompositionStart={() => setIsComposing(true)}
      onCompositionEnd={(e) => {
        setIsComposing(false);
        setQuery(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !isComposing) {
          handleSearch();
        }
      }}
    />
  );
}
```

**도구**:
- 브라우저 DevTools
- 모바일 디바이스 테스트
- 크로스 브라우저 테스트 도구

---

## 📚 추가 학습 자료

### 공식 문서
- [React 공식 문서 - Controlled Components](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)
- [MDN - File API](https://developer.mozilla.org/ko/docs/Web/API/File)
- [MDN - CompositionEvent](https://developer.mozilla.org/ko/docs/Web/API/CompositionEvent)

### 도구
- react-hook-form
- Formik
- File API

### 실습 프로젝트 아이디어
1. **폼 라이브러리**: 재사용 가능한 폼 컴포넌트 구현
2. **파일 업로드 컴포넌트**: 진행률, 취소, 재시도 포함
3. **IME 안전 입력 컴포넌트**: 한글 입력 최적화
