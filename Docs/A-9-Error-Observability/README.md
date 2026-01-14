# A-9. 에러 처리/관측성

에러 처리와 관측성(Observability) 관련 핵심 지식을 상황별로 정리합니다.

## 📋 체크리스트 항목

### 에러 UX/에러 바운더리/트래킹

#### Lv1: 설명 가능
**학습 목표**: 사용자 메시지/로깅/복구 UX를 구분해 설명할 수 있습니다.

**에러 처리 레이어**:
1. **사용자 메시지**: 사용자에게 보여주는 에러 메시지
2. **로깅**: 개발자가 디버깅하기 위한 로그
3. **복구 UX**: 사용자가 에러에서 복구할 수 있는 방법

**에러 바운더리 (Error Boundary)**:
- React 컴포넌트 트리에서 발생한 에러를 잡아내는 컴포넌트
- 하위 컴포넌트의 에러를 처리하고 Fallback UI 표시

**학습 자료**:
- [React 공식 문서 - 에러 바운더리](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Web.dev - 에러 처리](https://web.dev/error-handling/)

#### Lv2: 실습 경험
**학습 목표**: 에러 바운더리 및 에러 트래킹 도구를 연동해본 적이 있습니다.

**실습 과제**:
1. **에러 바운더리 구현**:
   ```javascript
   class ErrorBoundary extends React.Component {
     constructor(props) {
       super(props);
       this.state = { hasError: false };
     }
     
     static getDerivedStateFromError(error) {
       return { hasError: true };
     }
     
     componentDidCatch(error, errorInfo) {
       // 에러 로깅
       console.error('Error caught:', error, errorInfo);
       // 에러 트래킹 서비스에 전송
       logErrorToService(error, errorInfo);
     }
     
     render() {
       if (this.state.hasError) {
         return <h1>Something went wrong.</h1>;
       }
       return this.props.children;
     }
   }
   ```
2. **에러 트래킹 연동**: Sentry, LogRocket 등 사용
3. **사용자 친화적 에러 메시지**: 기술적 에러를 사용자 언어로 변환

**실습 체크리스트**:
- [ ] 에러 바운더리 구현
- [ ] 에러 트래킹 도구 연동
- [ ] 사용자 친화적 에러 메시지 작성

#### Lv3: 실무 해결 경험
**학습 목표**: 재현 어려운 이슈를 로그/트레이싱으로 추적해 해결해본 적이 있습니다.

**실무 시나리오**:
- 프로덕션에서만 발생하는 에러
- 사용자 환경에서만 재현되는 문제
- 에러 발생 빈도는 낮지만 영향이 큰 이슈

**해결 방법**:
1. **에러 트래킹**: Sentry 등으로 에러 수집
2. **사용자 컨텍스트**: 사용자 ID, 세션 정보 등 수집
3. **에러 분류**: 에러 타입별로 분류 및 우선순위 설정
4. **알림 설정**: 중요한 에러 발생 시 알림

**도구**:
- Sentry
- LogRocket
- Datadog
- Custom 로깅 시스템

---

## 📚 추가 학습 자료

### 공식 문서
- [React 공식 문서 - 에러 바운더리](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

### 도구
- Sentry
- LogRocket
- Datadog

### 실습 프로젝트 아이디어
1. **에러 처리 시스템**: 통합 에러 처리 시스템 구축
2. **에러 모니터링 대시보드**: 에러 통계 및 추적 대시보드
3. **에러 가이드 문서**: 팀 내 에러 처리 가이드 작성
