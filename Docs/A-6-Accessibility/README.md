# A-6. 접근성(A11y)

웹 접근성 관련 핵심 지식을 상황별로 정리합니다.

## 📋 체크리스트 항목

### 시맨틱/키보드 내비게이션

#### Lv1: 설명 가능
**학습 목표**: 시맨틱 태그와 키보드 접근성의 중요성을 설명할 수 있습니다.

**시맨틱 태그**:
- HTML5에서 도입된 의미 있는 태그들
- `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` 등
- 스크린리더가 페이지 구조를 이해하는 데 도움
- SEO에도 유리

**키보드 접근성**:
- 마우스를 사용할 수 없는 사용자를 위한 필수 기능
- Tab 키로 포커스 이동
- Enter/Space로 상호작용
- 화살표 키로 메뉴/리스트 탐색

**접근성의 중요성**:
- 법적 요구사항 (WCAG 준수)
- 사용자 경험 향상
- SEO 개선
- 다양한 사용자 지원

**학습 자료**:
- [MDN - 접근성](https://developer.mozilla.org/ko/docs/Web/Accessibility)
- [WCAG 가이드라인](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM - 접근성 가이드](https://webaim.org/)

#### Lv2: 실습 경험
**학습 목표**: focus 관리(모달, 드롭다운)와 aria 적용을 해본 적이 있습니다.

**실습 과제**:
1. **시맨틱 HTML 사용**:
   ```html
   <!-- ❌ 나쁜 예 -->
   <div class="header">...</div>
   <div class="nav">...</div>
   
   <!-- ✅ 좋은 예 -->
   <header>...</header>
   <nav>...</nav>
   ```
2. **키보드 내비게이션**:
   ```javascript
   function Dropdown() {
     const [isOpen, setIsOpen] = useState(false);
     
     const handleKeyDown = (e) => {
       if (e.key === 'Escape') {
         setIsOpen(false);
       } else if (e.key === 'ArrowDown') {
         // 다음 항목으로 포커스 이동
       }
     };
     
     return (
       <div onKeyDown={handleKeyDown}>
         <button aria-expanded={isOpen}>메뉴</button>
         {isOpen && <ul role="menu">...</ul>}
       </div>
     );
   }
   ```
3. **ARIA 속성 적용**:
   ```html
   <button aria-label="닫기" aria-expanded="true">
     <span aria-hidden="true">×</span>
   </button>
   
   <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
     <h2 id="modal-title">모달 제목</h2>
   </div>
   ```
4. **Focus 관리**: 모달 열릴 때 첫 번째 포커스 가능 요소로 이동

**실습 체크리스트**:
- [ ] 시맨틱 HTML 사용
- [ ] 키보드 내비게이션 구현
- [ ] ARIA 속성 적용
- [ ] Focus 관리 구현

#### Lv3: 실무 해결 경험
**학습 목표**: 스크린리더 기준으로 결함을 찾아 개선해본 적이 있습니다.

**실무 시나리오**:
- 스크린리더에서 페이지 구조가 명확하지 않음
- 키보드로 접근 불가능한 요소 존재
- 포커스 표시가 명확하지 않음
- ARIA 속성이 잘못 사용됨

**개선 프로세스**:
1. **접근성 감사**: 
   - 스크린리더로 테스트 (NVDA, VoiceOver)
   - 키보드만으로 사용 테스트
   - 접근성 검사 도구 사용
2. **문제 식별**: 
   - 포커스 순서 확인
   - ARIA 속성 검증
   - 색상 대비 확인
3. **개선 적용**:
   - 시맨틱 HTML로 변경
   - ARIA 속성 추가/수정
   - 키보드 내비게이션 개선
4. **검증**: 스크린리더로 다시 테스트

**접근성 체크리스트**:
- [ ] 모든 상호작용 요소가 키보드로 접근 가능
- [ ] 포커스 표시가 명확함
- [ ] 시맨틱 HTML 사용
- [ ] ARIA 속성 올바르게 사용
- [ ] 색상 대비 WCAG AA 기준 충족
- [ ] 이미지에 alt 텍스트 제공
- [ ] 폼에 label 연결
- [ ] 에러 메시지가 명확함

**도구**:
- NVDA (Windows 스크린리더)
- VoiceOver (macOS/iOS 스크린리더)
- axe DevTools
- Lighthouse 접근성 감사
- WAVE (웹 접근성 평가 도구)

---

## 📚 추가 학습 자료

### 공식 문서
- [MDN - 접근성](https://developer.mozilla.org/ko/docs/Web/Accessibility)
- [WCAG 가이드라인](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA 사양](https://www.w3.org/WAI/ARIA/apg/)

### 도구
- NVDA
- VoiceOver
- axe DevTools
- Lighthouse
- WAVE

### 실습 프로젝트 아이디어
1. **접근성 컴포넌트 라이브러리**: 접근성을 고려한 컴포넌트 구현
2. **접근성 감사 도구**: 자동 접근성 검사 스크립트
3. **접근성 가이드 문서**: 팀 내 접근성 코딩 가이드 작성
