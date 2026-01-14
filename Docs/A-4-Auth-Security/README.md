# A-4. 인증/보안 (실무 필수 안전장치)

인증과 보안 관련 핵심 지식을 상황별로 정리합니다.

## 📋 체크리스트 항목

### 1. 인증 방식 이해

#### Lv1: 설명 가능
**학습 목표**: 쿠키/토큰 기반 인증의 차이를 설명할 수 있습니다.

**쿠키 기반 인증**:
- 서버에서 세션 ID를 쿠키로 전달
- 브라우저가 자동으로 쿠키 관리
- `HttpOnly`, `Secure`, `SameSite` 속성으로 보안 강화
- XSS 공격에 상대적으로 안전 (HttpOnly 사용 시)

**토큰 기반 인증 (JWT)**:
- 클라이언트가 토큰을 저장하고 요청 시 전달
- 서버가 토큰을 검증하여 인증 처리
- Stateless: 서버에 세션 저장 불필요
- XSS 공격에 취약 (로컬 스토리지 저장 시)

**비교**:
| 항목 | 쿠키 기반 | 토큰 기반 |
|------|----------|----------|
| 저장 위치 | 브라우저 쿠키 | 로컬 스토리지 / 메모리 |
| 자동 전송 | 예 | 아니오 (수동) |
| XSS 취약성 | 낮음 (HttpOnly) | 높음 |
| CSRF 취약성 | 높음 | 낮음 |
| 확장성 | 낮음 (서버 세션) | 높음 (Stateless) |

**학습 자료**:
- [MDN - HTTP 쿠키](https://developer.mozilla.org/ko/docs/Web/HTTP/Cookies)
- [JWT.io](https://jwt.io/)
- [OWASP - 인증 가이드](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

#### Lv2: 실습 경험
**학습 목표**: 401 처리, 로그인 유지(세션/토큰), refresh 흐름을 구현해본 적이 있습니다.

**실습 과제**:
1. **401 에러 처리**:
   ```javascript
   // Axios 인터셉터 예제
   axios.interceptors.response.use(
     response => response,
     error => {
       if (error.response?.status === 401) {
         // 토큰 갱신 또는 로그인 페이지로 리다이렉트
         handleUnauthorized();
       }
       return Promise.reject(error);
     }
   );
   ```
2. **토큰 갱신 (Refresh Token)**:
   ```javascript
   async function refreshToken() {
     const refreshToken = localStorage.getItem('refreshToken');
     const response = await fetch('/api/auth/refresh', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ refreshToken }),
     });
     const { accessToken } = await response.json();
     localStorage.setItem('accessToken', accessToken);
     return accessToken;
   }
   ```
3. **자동 로그인 유지**: 토큰 만료 전 갱신

**실습 체크리스트**:
- [ ] 401 에러 처리 구현
- [ ] Refresh token 흐름 구현
- [ ] 토큰 자동 갱신 구현
- [ ] 로그인 상태 관리

#### Lv3: 실무 해결 경험
**학습 목표**: 만료 경합/루프/보안 사고성 이슈를 실무에서 해결해본 적이 있습니다.

**실무 시나리오**:
- 여러 요청이 동시에 401을 받아 refresh가 중복 실행됨
- Refresh token도 만료되어 무한 루프 발생
- 토큰이 탈취되어 악용되는 경우

**해결 방법**:
1. **Refresh 요청 중복 방지**:
   ```javascript
   let refreshPromise = null;
   
   async function refreshToken() {
     if (refreshPromise) {
       return refreshPromise;
     }
     
     refreshPromise = (async () => {
       try {
         const refreshToken = localStorage.getItem('refreshToken');
         const response = await fetch('/api/auth/refresh', {
           method: 'POST',
           body: JSON.stringify({ refreshToken }),
         });
         const { accessToken } = await response.json();
         localStorage.setItem('accessToken', accessToken);
         return accessToken;
       } finally {
         refreshPromise = null;
       }
     })();
     
     return refreshPromise;
   }
   ```
2. **만료 체크**: Refresh token 만료 시 로그아웃
3. **토큰 저장소 보안**: 
   - HttpOnly 쿠키 사용 (가능한 경우)
   - 메모리 저장 고려 (XSS 방지)
4. **토큰 무효화**: 로그아웃 시 서버에서 토큰 블랙리스트 관리

**도구**:
- Axios 인터셉터
- React Query (인증 상태 관리)
- 보안 스캐너

---

### 2. XSS/CSRF

#### Lv1: 설명 가능
**학습 목표**: XSS/CSRF의 원리와 방어 관점을 설명할 수 있습니다.

**XSS (Cross-Site Scripting)**:
- 악성 스크립트를 웹 페이지에 삽입하는 공격
- 사용자의 쿠키, 토큰 등을 탈취 가능
- **Reflected XSS**: URL 파라미터에 스크립트 포함
- **Stored XSS**: 데이터베이스에 저장된 스크립트 실행
- **DOM-based XSS**: 클라이언트 측에서 발생

**CSRF (Cross-Site Request Forgery)**:
- 사용자가 의도하지 않은 요청을 강제로 실행시키는 공격
- 인증된 사용자의 권한으로 악의적인 요청 수행
- 쿠키 기반 인증에서 취약

**방어 방법**:
- **XSS**: 입력 검증, 출력 이스케이프, CSP (Content Security Policy)
- **CSRF**: CSRF 토큰, SameSite 쿠키, Referer 검증

**학습 자료**:
- [OWASP - XSS](https://owasp.org/www-community/attacks/xss/)
- [OWASP - CSRF](https://owasp.org/www-community/attacks/csrf)
- [MDN - CSP](https://developer.mozilla.org/ko/docs/Web/HTTP/CSP)

#### Lv2: 실습 경험
**학습 목표**: 위험한 렌더링(HTML 삽입) 회피 및 입력/출력 방어를 적용해본 적이 있습니다.

**실습 과제**:
1. **입력 검증**:
   ```javascript
   // ❌ 위험: HTML 직접 삽입
   <div dangerouslySetInnerHTML={{ __html: userInput }} />
   
   // ✅ 안전: 이스케이프 처리
   <div>{userInput}</div> // React는 자동 이스케이프
   ```
2. **출력 이스케이프**: 
   ```javascript
   function escapeHtml(text) {
     const div = document.createElement('div');
     div.textContent = text;
     return div.innerHTML;
   }
   ```
3. **CSP 설정**:
   ```html
   <meta http-equiv="Content-Security-Policy" 
         content="default-src 'self'; script-src 'self'">
   ```
4. **CSRF 토큰**: 폼 제출 시 CSRF 토큰 포함

**예제 코드**:
```javascript
// XSS 방어: 입력 검증 및 이스케이프
function UserComment({ comment }) {
  // 서버에서 이미 이스케이프 처리되었다고 가정
  // 또는 React가 자동으로 이스케이프 처리
  return <div>{comment}</div>;
}

// CSRF 토큰 포함 요청
async function submitForm(data) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
  await fetch('/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    },
    body: JSON.stringify(data),
  });
}
```

**실습 체크리스트**:
- [ ] 입력 검증 구현
- [ ] 출력 이스케이프 적용
- [ ] CSP 설정
- [ ] CSRF 토큰 사용

#### Lv3: 실무 해결 경험
**학습 목표**: 실제 서비스에서 보안 이슈를 점검/개선/가이드화해본 적이 있습니다.

**실무 시나리오**:
- 사용자 입력이 그대로 렌더링되어 XSS 취약점 발견
- 쿠키 기반 인증에서 CSRF 공격 가능성
- 서드파티 라이브러리에서 보안 취약점 발견

**보안 점검 프로세스**:
1. **정기 보안 점검**:
   - 입력 검증 확인
   - 출력 이스케이프 확인
   - CSP 설정 확인
   - 인증/인가 로직 검토
2. **보안 스캔 도구 사용**:
   - OWASP ZAP
   - Snyk
   - npm audit
3. **가이드 문서화**:
   - 보안 코딩 가이드 작성
   - 코드 리뷰 체크리스트에 보안 항목 추가
   - 팀 교육 자료 준비

**보안 체크리스트**:
- [ ] 모든 사용자 입력 검증
- [ ] 출력 시 이스케이프 처리
- [ ] CSP 헤더 설정
- [ ] CSRF 토큰 사용
- [ ] HttpOnly 쿠키 사용 (가능한 경우)
- [ ] Secure 쿠키 사용 (HTTPS)
- [ ] SameSite 쿠키 설정
- [ ] 정기적인 보안 업데이트

**도구**:
- OWASP ZAP
- Snyk
- npm audit
- 보안 헤더 검사 도구

---

## 📚 추가 학습 자료

### 공식 문서
- [MDN - HTTP 쿠키](https://developer.mozilla.org/ko/docs/Web/HTTP/Cookies)
- [JWT.io](https://jwt.io/)
- [OWASP - 보안 가이드](https://owasp.org/www-project-top-ten/)

### 도구
- OWASP ZAP
- Snyk
- npm audit
- 브라우저 DevTools Security 탭

### 실습 프로젝트 아이디어
1. **인증 시스템 구현**: 쿠키/토큰 기반 인증 구현
2. **보안 점검 도구**: 자동 보안 점검 스크립트 작성
3. **보안 가이드 문서**: 팀 내 보안 코딩 가이드 작성
