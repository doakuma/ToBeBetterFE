# A-8. 성능 (측정 → 개선 → 검증)

웹 성능 최적화 관련 핵심 지식을 상황별로 정리합니다.

## 📋 체크리스트 항목

### Core Web Vitals

#### Lv1: 설명 가능
**학습 목표**: LCP/INP/CLS 의미를 설명할 수 있습니다.

**Core Web Vitals**:
- Google이 정의한 사용자 경험을 측정하는 핵심 지표
- LCP, INP, CLS 세 가지 지표로 구성

**LCP (Largest Contentful Paint)**:
- 가장 큰 콘텐츠 요소가 렌더링되는 시간
- 좋음: 2.5초 이하
- 나쁨: 4.0초 초과

**INP (Interaction to Next Paint)**:
- 사용자 상호작용 후 다음 프레임까지의 시간
- 좋음: 200ms 이하
- 나쁨: 500ms 초과

**CLS (Cumulative Layout Shift)**:
- 레이아웃 이동의 누적 점수
- 좋음: 0.1 이하
- 나쁨: 0.25 초과

**학습 자료**:
- [Web.dev - Core Web Vitals](https://web.dev/vitals/)
- [Google Search Central - Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)

#### Lv2: 실습 경험
**학습 목표**: 이미지/폰트/코드 스플리팅으로 개선을 적용해본 적이 있습니다.

**실습 과제**:
1. **이미지 최적화**:
   ```html
   <!-- ✅ 좋은 예 -->
   <img 
     src="image.jpg" 
     srcset="image-400.jpg 400w, image-800.jpg 800w"
     sizes="(max-width: 600px) 400px, 800px"
     loading="lazy"
     alt="Description"
   />
   ```
2. **폰트 최적화**:
   ```css
   @font-face {
     font-family: 'MyFont';
     src: url('font.woff2') format('woff2');
     font-display: swap; /* FOIT 방지 */
   }
   ```
3. **코드 스플리팅**:
   ```javascript
   // React.lazy 사용
   const LazyComponent = React.lazy(() => import('./LazyComponent'));
   
   function App() {
     return (
       <Suspense fallback={<div>Loading...</div>}>
         <LazyComponent />
       </Suspense>
     );
   }
   ```

**실습 체크리스트**:
- [ ] 이미지 최적화 적용
- [ ] 폰트 최적화 적용
- [ ] 코드 스플리팅 적용
- [ ] Lighthouse로 측정

#### Lv3: 실무 해결 경험
**학습 목표**: 지표 기반으로 개선을 설계하고 회귀 방지까지 해본 적이 있습니다.

**실무 시나리오**:
- Core Web Vitals 점수가 낮음
- 사용자 이탈률 증가
- 검색 엔진 순위 하락

**개선 프로세스**:
1. **측정**: Lighthouse, PageSpeed Insights로 현재 점수 확인
2. **목표 설정**: 각 지표별 목표 값 설정
3. **개선 적용**: 
   - 이미지 최적화
   - 코드 스플리팅
   - 레이아웃 안정화
4. **검증**: 개선 후 점수 재측정
5. **회귀 방지**: CI/CD에 성능 테스트 추가

**도구**:
- Lighthouse
- PageSpeed Insights
- Chrome DevTools Performance
- Web Vitals Extension

---

## 📚 추가 학습 자료

### 공식 문서
- [Web.dev - Core Web Vitals](https://web.dev/vitals/)
- [Web.dev - 성능 최적화](https://web.dev/performance/)

### 도구
- Lighthouse
- PageSpeed Insights
- Chrome DevTools Performance
- Web Vitals Extension

### 실습 프로젝트 아이디어
1. **성능 최적화 프로젝트**: 기존 프로젝트 성능 개선
2. **성능 모니터링 시스템**: 실시간 성능 지표 추적
3. **성능 가이드 문서**: 팀 내 성능 최적화 가이드 작성
