# A-1. 화면/렌더링 (렌더링/레이아웃/스크롤)

화면 렌더링과 관련된 핵심 지식을 상황별로 정리합니다.

## 📋 체크리스트 항목

### 1. 스크롤 성능 이슈(버벅임)

#### Lv1: 설명 가능

**학습 목표**: DOM/CSSOM, Layout/Paint/Composite 차이를 설명할 수 있습니다.

**핵심 개념**:

- **DOM (Document Object Model)**: HTML을 파싱하여 생성되는 트리 구조
- **CSSOM (CSS Object Model)**: CSS를 파싱하여 생성되는 스타일 트리
- **렌더링 파이프라인**:
  1. **Layout (Reflow)**: 요소의 위치와 크기를 계산하는 과정
  2. **Paint**: 실제 픽셀을 그리는 과정
  3. **Composite**: 여러 레이어를 합성하는 과정

**성능 영향**:

- Layout은 가장 비용이 큰 작업 (전체 트리 재계산 가능)
- Paint는 중간 비용 (해당 레이어만 다시 그리기)
- Composite는 가장 가벼운 작업 (GPU 가속 가능)

**학습 자료**:

- [Google Developers - 렌더링 성능](https://web.dev/rendering-performance/)
- [MDN - 렌더링 성능](https://developer.mozilla.org/ko/docs/Web/Performance/Rendering_performance)

#### Lv2: 실습 경험

**학습 목표**: 성능에 유리한 애니메이션 속성(transform/opacity) 중심으로 구성해본 적이 있습니다.

**실습 과제**:

1. **나쁜 예제**: `left`, `top`, `width`, `height`를 변경하는 애니메이션 구현
2. **좋은 예제**: `transform`, `opacity`를 사용하는 애니메이션 구현
3. **성능 비교**: Chrome DevTools Performance 탭으로 비교

**예제 코드**:

```css
/* ❌ 나쁜 예: Layout/Paint 발생 */
.bad-animation {
  transition: left 0.3s, top 0.3s;
}

/* ✅ 좋은 예: Composite만 발생 */
.good-animation {
  transition: transform 0.3s, opacity 0.3s;
}
```

**실습 체크리스트**:

- [ ] `left/top` 애니메이션과 `transform` 애니메이션 성능 비교
- [ ] `will-change` 속성 적용 및 효과 확인
- [ ] GPU 가속 레이어 확인 (Chrome DevTools Layers 탭)

#### Lv3: 실무 해결 경험

**학습 목표**: Performance 프로파일링을 통해 병목을 찾아 수정하고 개선을 검증해본 적이 있습니다.

**실무 시나리오**:

- 스크롤 시 버벅임 발생
- 애니메이션 중 프레임 드롭
- 리스트 렌더링 성능 이슈

**디버깅 프로세스**:

1. **문제 재현**: 실제 사용자 시나리오 재현
2. **프로파일링**: Chrome DevTools Performance 탭으로 기록
3. **병목 식별**: Long Task, Layout Thrashing 확인
4. **해결책 적용**:
   - `transform`/`opacity` 사용
   - `will-change` 적용
   - 가상 스크롤링 적용
   - 레이어 분리
5. **검증**: Before/After 비교 측정

**도구**:

- Chrome DevTools Performance
- React Profiler (React 앱인 경우)
- Lighthouse Performance Score

---

### 2. 레이아웃 점프(CLS)

#### Lv1: 설명 가능

**학습 목표**: CLS가 발생하는 대표 원인을 설명할 수 있습니다.

**CLS (Cumulative Layout Shift)**:

- 페이지 로드 중 요소가 예상치 못한 위치로 이동하는 현상
- 사용자 경험을 해치는 주요 지표 중 하나

**발생 원인**:

1. **이미지/비디오 크기 미지정**: `width`, `height` 속성 없음
2. **폰트 로딩 지연**: FOIT(Flash of Invisible Text), FOUT(Flash of Unstyled Text)
3. **동적 콘텐츠 삽입**: 광고, 위젯 등이 나중에 로드됨
4. **CSS 애니메이션**: 초기 위치와 최종 위치가 다름

**학습 자료**:

- [Web.dev - CLS](https://web.dev/cls/)
- [MDN - CLS](https://developer.mozilla.org/ko/docs/Web/Performance/Cumulative_Layout_Shift)

#### Lv2: 실습 경험

**학습 목표**: 이미지/폰트/스켈레톤/placeholder로 레이아웃을 안정화해본 적이 있습니다.

**실습 과제**:

1. **이미지 크기 지정**:
   ```html
   <!-- ✅ 좋은 예 -->
   <img src="image.jpg" width="800" height="600" alt="Description" />
   ```
2. **폰트 로딩 최적화**:
   ```css
   /* font-display: swap 사용 */
   @font-face {
     font-family: "MyFont";
     src: url("font.woff2") format("woff2");
     font-display: swap;
   }
   ```
3. **스켈레톤 UI 구현**: 로딩 중 레이아웃 유지
4. **Aspect Ratio 사용**: CSS `aspect-ratio` 속성 활용

**실습 체크리스트**:

- [ ] 이미지에 `width`/`height` 지정
- [ ] `font-display: swap` 적용
- [ ] 스켈레톤 컴포넌트 구현
- [ ] Chrome DevTools로 CLS 점수 측정

#### Lv3: 실무 해결 경험

**학습 목표**: 실제 페이지의 CLS를 개선하고 지표 변화로 확인해본 적이 있습니다.

**실무 시나리오**:

- 메인 페이지 CLS 점수 0.25 이상 (나쁨)
- 이미지 로딩으로 인한 레이아웃 점프
- 동적 광고 삽입으로 인한 점프

**개선 프로세스**:

1. **측정**: Lighthouse, Chrome DevTools로 CLS 점수 확인
2. **원인 분석**: Layout Shift 이벤트 확인
3. **해결책 적용**:
   - 이미지 크기 지정
   - `aspect-ratio` 사용
   - 스켈레톤 UI 적용
   - `font-display: swap` 설정
4. **검증**: CLS 점수 0.1 이하 달성 (좋음)

**도구**:

- Chrome DevTools Performance
- Lighthouse
- Web Vitals Extension

---

### 3. 모달/오버레이 UX

#### Lv1: 설명 가능

**학습 목표**: 모달에서 focus/스크롤/배경 인터랙션 관리가 왜 필요한지 설명할 수 있습니다.

**필요성**:

1. **접근성**: 키보드 사용자가 모달 밖으로 포커스가 나가지 않도록
2. **사용자 경험**: 모달이 열렸을 때 배경 스크롤 방지
3. **명확성**: 모달이 활성화된 상태임을 명확히 전달

**핵심 개념**:

- **Focus Trap**: 모달 내부에서만 포커스 순환
- **Focus Restore**: 모달 닫을 때 원래 포커스 위치로 복원
- **Scroll Lock**: 배경 스크롤 방지
- **ESC 키 처리**: ESC 키로 모달 닫기

**학습 자료**:

- [WAI-ARIA Authoring Practices - Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [MDN - 접근성 가이드](https://developer.mozilla.org/ko/docs/Web/Accessibility)

#### Lv2: 실습 경험

**학습 목표**: 스크롤 락, focus trap/restore를 구현해본 적이 있습니다.

**실습 과제**:

1. **스크롤 락 구현**:
   ```css
   body.modal-open {
     overflow: hidden;
   }
   ```
2. **Focus Trap 구현**:
   - 첫 번째/마지막 포커스 가능 요소에서 Tab/Shift+Tab 처리
   - `tabindex="-1"`로 포커스 불가 요소 제외
3. **Focus Restore**: 모달 열기 전 포커스 위치 저장, 닫을 때 복원
4. **ESC 키 처리**: `keydown` 이벤트 리스너 추가

**예제 코드**:

```javascript
// Focus Trap 간단 예제
function trapFocus(modalElement) {
  const focusableElements = modalElement.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  modalElement.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
}
```

**실습 체크리스트**:

- [ ] 스크롤 락 구현
- [ ] Focus trap 구현
- [ ] Focus restore 구현
- [ ] ESC 키 처리
- [ ] 스크린리더 테스트

#### Lv3: 실무 해결 경험

**학습 목표**: 접근성/모바일 환경 이슈까지 포함해 모달 관련 버그를 해결해본 적이 있습니다.

**실무 시나리오**:

- 모바일에서 배경 스크롤이 여전히 동작함
- iOS Safari에서 `overflow: hidden`이 작동하지 않음
- 스크린리더에서 모달이 제대로 인식되지 않음
- 여러 모달이 중첩될 때 포커스 관리 문제

**해결 방법**:

1. **모바일 스크롤 락**:
   ```javascript
   // iOS Safari 대응
   function lockScroll() {
     const scrollY = window.scrollY;
     document.body.style.position = "fixed";
     document.body.style.top = `-${scrollY}px`;
     document.body.style.width = "100%";
   }
   ```
2. **ARIA 속성 적용**:
   ```html
   <div role="dialog" aria-modal="true" aria-labelledby="modal-title">
     <h2 id="modal-title">Modal Title</h2>
   </div>
   ```
3. **중첩 모달 처리**: 모달 스택 관리 및 각 레벨별 포커스 관리

**도구**:

- Chrome DevTools Accessibility
- VoiceOver (macOS)
- NVDA (Windows)

---

### 4. z-index/겹침 문제

#### Lv1: 설명 가능

**학습 목표**: stacking context를 설명할 수 있습니다.

**Stacking Context (쌓임 맥락)**:

- 요소들이 3차원 공간에서 어떻게 쌓이는지를 결정하는 개념
- 각 stacking context는 독립적인 레이어를 형성

**Stacking Context 생성 조건**:

1. 루트 요소 (`<html>`)
2. `position: fixed` 또는 `position: sticky`
3. `z-index`가 있는 `position: relative` 또는 `position: absolute`
4. `opacity`가 1보다 작은 요소
5. `transform`, `filter`, `will-change` 등 특정 속성 사용

**우선순위 규칙**:

1. 같은 stacking context 내에서는 `z-index` 값으로 결정
2. 다른 stacking context 간에서는 부모의 stacking context 순서로 결정

**학습 자료**:

- [MDN - Stacking Context](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context)

#### Lv2: 실습 경험

**학습 목표**: 레이어 구조를 재설계하여 겹침 문제를 해결해본 적이 있습니다.

**실습 과제**:

1. **z-index 계층 구조 설계**:
   ```css
   /* 레이어 시스템 설계 */
   :root {
     --z-base: 1;
     --z-dropdown: 1000;
     --z-sticky: 2000;
     --z-modal-backdrop: 3000;
     --z-modal: 4000;
     --z-popover: 5000;
     --z-tooltip: 6000;
   }
   ```
2. **Stacking Context 확인**: Chrome DevTools Layers 탭 사용
3. **문제 해결**: z-index 값만으로 해결되지 않는 경우 구조 재설계

**예제 코드**:

```css
/* ❌ 나쁜 예: z-index 값만으로 해결 시도 */
.modal {
  z-index: 9999; /* 다른 요소와 충돌 가능 */
}

/* ✅ 좋은 예: 레이어 시스템 사용 */
.modal-backdrop {
  z-index: var(--z-modal-backdrop);
}
.modal {
  z-index: var(--z-modal);
}
```

**실습 체크리스트**:

- [ ] z-index 계층 구조 설계
- [ ] Stacking context 확인 도구 사용
- [ ] 겹침 문제 해결 사례 작성

#### Lv3: 실무 해결 경험

**학습 목표**: 복잡한 레이아웃/포털/고정 헤더 환경에서 일관되게 해결해본 적이 있습니다.

**실무 시나리오**:

- 여러 라이브러리에서 서로 다른 z-index 사용
- 포털(React Portal)을 사용한 모달이 다른 요소에 가려짐
- 고정 헤더와 드롭다운 메뉴 간 겹침 문제
- 테마/다크모드 전환 시 z-index 충돌

**해결 방법**:

1. **디자인 시스템 z-index 토큰 정의**: 모든 컴포넌트가 공통 토큰 사용
2. **포털 사용**: React Portal로 모달을 body 하위로 이동
3. **CSS 변수 활용**: 테마별 z-index 값 관리
4. **문서화**: 팀 내 z-index 사용 가이드 작성

**도구**:

- Chrome DevTools Layers
- CSS 변수 시스템
- 디자인 시스템 문서

---

## 📚 추가 학습 자료

### 공식 문서

- [Web.dev - 렌더링 성능](https://web.dev/rendering-performance/)
- [MDN - 렌더링 성능](https://developer.mozilla.org/ko/docs/Web/Performance/Rendering_performance)
- [Web.dev - CLS](https://web.dev/cls/)
- [MDN - Stacking Context](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context)

### 도구

- Chrome DevTools Performance
- Chrome DevTools Layers
- Lighthouse
- Web Vitals Extension

### 실습 프로젝트 아이디어

1. **성능 최적화 프로젝트**: 기존 프로젝트의 렌더링 성능 개선
2. **모달 컴포넌트 라이브러리**: 접근성을 고려한 모달 컴포넌트 구현
3. **레이아웃 안정화 프로젝트**: CLS 점수 0.1 이하 달성
