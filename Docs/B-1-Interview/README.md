# B-1. 취업 면접용 (설명력 중심)

취업 면접을 위한 핵심 지식을 설명력 중심으로 정리합니다.

## 📋 체크리스트

### 웹 동작 원리
- [ ] **렌더링 파이프라인**: DOM/CSSOM 생성 → 렌더 트리 → Layout → Paint → Composite
- [ ] **이벤트 루프**: Call Stack, Task Queue, Microtask Queue 동작 원리
- [ ] **CORS**: 동일 출처 정책, Preflight 요청, 해결 방법

### JavaScript 핵심
- [ ] **클로저**: 함수와 렉시컬 환경의 관계, 활용 사례
- [ ] **this 바인딩**: 일반 함수 vs 화살표 함수, call/apply/bind
- [ ] **비동기**: Promise, async/await, 이벤트 루프와의 관계
- [ ] **에러 처리**: try-catch, Promise 에러 처리, 에러 전파

### React 핵심
- [ ] **상태 설계**: 로컬/전역/서버 상태 구분, 상태 끌어올리기
- [ ] **useEffect 의존성**: 의존성 배열, Stale Closure, 무한 루프 방지
- [ ] **리스트 key**: Virtual DOM diffing, key 안정성
- [ ] **성능 기본**: 리렌더 최적화, 메모이제이션 전략

### CSS 핵심
- [ ] **Flex/Grid**: 레이아웃 설계, 반응형 구현
- [ ] **Stacking Context**: z-index 동작 원리, 겹침 문제 해결
- [ ] **반응형**: 미디어 쿼리, 뷰포트 단위, 모바일 퍼스트

### 보안/성능
- [ ] **XSS/CSRF**: 공격 원리, 방어 방법
- [ ] **Core Web Vitals**: LCP, INP, CLS 의미와 개선 방법

### 테스트 개념
- [ ] **테스트 종류**: 단위/통합/컴포넌트/E2E 목적 구분
- [ ] **테스트 전략**: 테스트 피라미드, 우선순위

---

## 📚 학습 자료

### 웹 동작 원리
- [Web.dev - 렌더링 성능](https://web.dev/rendering-performance/)
- [MDN - 이벤트 루프](https://developer.mozilla.org/ko/docs/Web/JavaScript/EventLoop)

### JavaScript
- [MDN - 클로저](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures)
- [MDN - this](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this)

### React
- [React 공식 문서](https://react.dev/)

### CSS
- [MDN - Flexbox](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [MDN - Grid](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Grid_Layout)

---

## 💡 면접 준비 팁

1. **설명 연습**: 개념을 자신의 언어로 설명할 수 있도록 연습
2. **예제 준비**: 실제 코드 예제로 설명할 수 있도록 준비
3. **트레이드오프**: 각 방법의 장단점을 설명할 수 있도록 준비
4. **실무 경험**: 가능한 한 실제 경험을 바탕으로 설명
