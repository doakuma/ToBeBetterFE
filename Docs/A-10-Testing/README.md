# A-10. 테스트

테스트 전략과 실무 적용 관련 핵심 지식을 상황별로 정리합니다.

## 📋 체크리스트 항목

### 테스트 전략

#### Lv1: 설명 가능
**학습 목표**: 단위/컴포넌트/E2E 테스트 목적과 비용을 설명할 수 있습니다.

**테스트 피라미드**:
1. **단위 테스트 (Unit Test)**:
   - 개별 함수/모듈 테스트
   - 빠르고 비용이 낮음
   - 가장 많은 테스트 작성

2. **컴포넌트 테스트 (Component Test)**:
   - React 컴포넌트 테스트
   - 사용자 상호작용 시뮬레이션
   - 중간 비용

3. **E2E 테스트 (End-to-End Test)**:
   - 전체 사용자 플로우 테스트
   - 느리고 비용이 높음
   - 핵심 플로우만 테스트

**학습 자료**:
- [Testing Library 공식 문서](https://testing-library.com/)
- [Jest 공식 문서](https://jestjs.io/)
- [Playwright 공식 문서](https://playwright.dev/)

#### Lv2: 실습 경험
**학습 목표**: 핵심 플로우에 대해 테스트를 작성해본 적이 있습니다.

**실습 과제**:
1. **단위 테스트 작성**:
   ```javascript
   // utils.test.js
   import { formatDate } from './utils';
   
   test('formats date correctly', () => {
     expect(formatDate('2024-01-01')).toBe('2024년 1월 1일');
   });
   ```
2. **컴포넌트 테스트 작성**:
   ```javascript
   // Button.test.jsx
   import { render, screen, fireEvent } from '@testing-library/react';
   import Button from './Button';
   
   test('calls onClick when clicked', () => {
     const handleClick = jest.fn();
     render(<Button onClick={handleClick}>Click me</Button>);
     
     fireEvent.click(screen.getByText('Click me'));
     expect(handleClick).toHaveBeenCalledTimes(1);
   });
   ```
3. **E2E 테스트 작성**: Playwright 또는 Cypress 사용

**실습 체크리스트**:
- [ ] 단위 테스트 작성
- [ ] 컴포넌트 테스트 작성
- [ ] E2E 테스트 작성

#### Lv3: 실무 해결 경험
**학습 목표**: flaky 테스트 제거/CI 안정화/리팩토링 안전망 운영 경험이 있습니다.

**실무 시나리오**:
- CI에서 간헐적으로 실패하는 테스트
- 테스트 실행 시간이 너무 김
- 리팩토링 시 테스트가 부족하여 회귀 발생

**해결 방법**:
1. **Flaky 테스트 제거**: 
   - 타이밍 이슈 해결 (waitFor 사용)
   - 테스트 격리 (각 테스트 독립적으로 실행)
2. **CI 최적화**: 
   - 테스트 병렬 실행
   - 캐시 활용
3. **테스트 커버리지**: 핵심 로직에 대한 테스트 커버리지 유지

**도구**:
- Jest
- Testing Library
- Playwright
- Cypress

---

## 📚 추가 학습 자료

### 공식 문서
- [Testing Library 공식 문서](https://testing-library.com/)
- [Jest 공식 문서](https://jestjs.io/)
- [Playwright 공식 문서](https://playwright.dev/)

### 도구
- Jest
- Testing Library
- Playwright
- Cypress

### 실습 프로젝트 아이디어
1. **테스트 전략 수립**: 프로젝트에 맞는 테스트 전략 설계
2. **테스트 자동화**: CI/CD에 테스트 통합
3. **테스트 가이드 문서**: 팀 내 테스트 작성 가이드
