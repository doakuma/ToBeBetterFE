# A-7. 스타일/디자인 시스템

스타일링과 디자인 시스템 관련 핵심 지식을 상황별로 정리합니다.

## 📋 체크리스트 항목

### 1. 토큰/테마/variant

#### Lv1: 설명 가능
**학습 목표**: 디자인 토큰(CSS 변수) 기반 설계의 장점을 설명할 수 있습니다.

**디자인 토큰**:
- 디자인의 기본 단위 (색상, 간격, 타이포그래피 등)
- CSS 변수로 구현하여 일관성 유지
- 테마 전환, 다크모드 등에 유리

**장점**:
1. **일관성**: 전체 시스템에서 동일한 값 사용
2. **유지보수**: 한 곳에서 변경하면 전체 반영
3. **확장성**: 테마 추가가 쉬움
4. **협업**: 디자이너와 개발자 간 소통 용이

**학습 자료**:
- [Material Design - 디자인 토큰](https://m3.material.io/foundations/design-tokens/overview)
- [W3C - CSS 변수](https://www.w3.org/TR/css-variables-1/)

#### Lv2: 실습 경험
**학습 목표**: variant(크기/상태/색상) API를 설계해본 적이 있습니다.

**실습 과제**:
1. **디자인 토큰 정의**:
   ```css
   :root {
     /* 색상 */
     --color-primary: #007bff;
     --color-secondary: #6c757d;
     --color-success: #28a745;
     --color-danger: #dc3545;
     
     /* 간격 */
     --spacing-xs: 0.25rem;
     --spacing-sm: 0.5rem;
     --spacing-md: 1rem;
     --spacing-lg: 1.5rem;
     
     /* 타이포그래피 */
     --font-size-sm: 0.875rem;
     --font-size-base: 1rem;
     --font-size-lg: 1.25rem;
   }
   ```
2. **Variant API 설계**:
   ```javascript
   function Button({ variant = 'primary', size = 'md', children }) {
     return (
       <button className={`btn btn--${variant} btn--${size}`}>
         {children}
       </button>
     );
   }
   ```
3. **테마 시스템**: 다크모드 지원

**실습 체크리스트**:
- [ ] 디자인 토큰 정의
- [ ] Variant API 설계
- [ ] 테마 시스템 구현

#### Lv3: 실무 해결 경험
**학습 목표**: 확장성/일관성 문제를 구조적으로 해결해본 적이 있습니다.

**실무 시나리오**:
- 여러 팀에서 서로 다른 스타일 사용
- 디자인 토큰이 일관되지 않음
- 테마 추가 시 기존 코드 수정 필요

**해결 방법**:
1. **디자인 시스템 구축**: 중앙화된 토큰 관리
2. **컴포넌트 라이브러리**: 재사용 가능한 컴포넌트 제공
3. **문서화**: 토큰 사용 가이드 작성
4. **자동화**: 토큰을 코드로 변환하는 도구 구축

**도구**:
- Style Dictionary
- CSS 변수
- 디자인 시스템 문서

---

### 2. CSS 스코프/우선순위

#### Lv1: 설명 가능
**학습 목표**: 우선순위/특이성/전역 오염을 설명할 수 있습니다.

**CSS 우선순위 (Specificity)**:
1. 인라인 스타일 (1000점)
2. ID 선택자 (100점)
3. 클래스/속성/가상 클래스 (10점)
4. 요소/가상 요소 (1점)

**전역 오염**:
- CSS가 전역 스코프에 있어 다른 컴포넌트에 영향
- 클래스명 충돌 가능
- 예측하기 어려운 스타일 적용

**학습 자료**:
- [MDN - CSS 특이성](https://developer.mozilla.org/ko/docs/Web/CSS/Specificity)
- [MDN - CSS 스코프](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_scoping)

#### Lv2: 실습 경험
**학습 목표**: CSS Modules 등으로 스코프 문제를 관리해본 적이 있습니다.

**실습 과제**:
1. **CSS Modules 사용**:
   ```javascript
   // Button.module.css
   .button {
     padding: 0.5rem 1rem;
   }
   
   // Button.jsx
   import styles from './Button.module.css';
   function Button() {
     return <button className={styles.button}>Click</button>;
   }
   ```
2. **Styled Components 사용**:
   ```javascript
   import styled from 'styled-components';
   
   const Button = styled.button`
     padding: 0.5rem 1rem;
   `;
   ```
3. **BEM 명명 규칙**: 클래스명 충돌 방지

**실습 체크리스트**:
- [ ] CSS Modules 사용
- [ ] Styled Components 사용
- [ ] BEM 명명 규칙 적용

#### Lv3: 실무 해결 경험
**학습 목표**: 대규모에서 스타일 충돌을 줄이는 규칙/가이드를 운영해본 적이 있습니다.

**실무 시나리오**:
- 여러 개발자가 작업하며 스타일 충돌 발생
- 전역 CSS로 인한 예상치 못한 스타일 적용
- 유지보수가 어려운 CSS 구조

**해결 방법**:
1. **스타일 가이드 작성**: 명명 규칙, 구조 가이드
2. **CSS-in-JS 또는 CSS Modules**: 스코프 격리
3. **Linter 규칙**: 스타일 가이드 자동 검사
4. **코드 리뷰**: 스타일 관련 리뷰 체크리스트

**도구**:
- CSS Modules
- Styled Components
- Emotion
- stylelint

---

## 📚 추가 학습 자료

### 공식 문서
- [MDN - CSS 변수](https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties)
- [MDN - CSS 특이성](https://developer.mozilla.org/ko/docs/Web/CSS/Specificity)

### 도구
- CSS Modules
- Styled Components
- Style Dictionary
- stylelint

### 실습 프로젝트 아이디어
1. **디자인 시스템 구축**: 토큰 기반 디자인 시스템
2. **컴포넌트 라이브러리**: 재사용 가능한 컴포넌트
3. **스타일 가이드 문서**: 팀 내 스타일 가이드 작성
