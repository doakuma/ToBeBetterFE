# A-11. 빌드/배포/환경

빌드, 배포, 환경 관리 관련 핵심 지식을 상황별로 정리합니다.

## 📋 체크리스트 항목

### 번들/캐시/소스맵

#### Lv1: 설명 가능
**학습 목표**: 번들링, 트리 쉐이킹, 소스맵의 의미를 설명할 수 있습니다.

**번들링 (Bundling)**:
- 여러 파일을 하나의 파일로 묶는 과정
- 네트워크 요청 수 감소
- 모듈 의존성 해결

**트리 쉐이킹 (Tree Shaking)**:
- 사용하지 않는 코드를 제거하는 최적화
- 번들 크기 감소
- ES 모듈 사용 시 효과적

**소스맵 (Source Map)**:
- 번들된 코드와 원본 코드를 매핑하는 파일
- 디버깅 시 원본 코드 위치 확인 가능
- 프로덕션에서는 보안상 제거 권장

**학습 자료**:
- [Webpack 공식 문서](https://webpack.js.org/)
- [Vite 공식 문서](https://vitejs.dev/)
- [MDN - 소스맵](https://developer.mozilla.org/ko/docs/Tools/Debugger/How_to/Use_a_source_map)

#### Lv2: 실습 경험
**학습 목표**: 환경변수(dev/stage/prod) 분리 및 배포 흐름을 다뤄본 적이 있습니다.

**실습 과제**:
1. **환경변수 관리**:
   ```javascript
   // .env.development
   VITE_API_URL=http://localhost:3000
   
   // .env.production
   VITE_API_URL=https://api.example.com
   
   // 코드에서 사용
   const apiUrl = import.meta.env.VITE_API_URL;
   ```
2. **빌드 스크립트**:
   ```json
   {
     "scripts": {
       "build:dev": "vite build --mode development",
       "build:prod": "vite build --mode production"
     }
   }
   ```
3. **배포 자동화**: GitHub Actions, GitLab CI 등 설정

**실습 체크리스트**:
- [ ] 환경변수 설정
- [ ] 빌드 스크립트 작성
- [ ] 배포 자동화 설정

#### Lv3: 실무 해결 경험
**학습 목표**: 배포 후에만 발생하는 문제(CDN/캐시 등)를 디버깅해 해결해본 적이 있습니다.

**실무 시나리오**:
- 배포 후에도 이전 버전이 표시됨 (CDN 캐시)
- 소스맵이 없어 디버깅이 어려움
- 환경변수가 제대로 적용되지 않음

**해결 방법**:
1. **캐시 무효화**: 파일명에 해시 추가, CDN 캐시 무효화
2. **소스맵 관리**: 프로덕션에서는 제한적으로만 사용
3. **환경변수 검증**: 빌드 시 환경변수 확인

**도구**:
- Webpack
- Vite
- GitHub Actions
- Docker

---

## 📚 추가 학습 자료

### 공식 문서
- [Webpack 공식 문서](https://webpack.js.org/)
- [Vite 공식 문서](https://vitejs.dev/)

### 도구
- Webpack
- Vite
- GitHub Actions
- Docker

### 실습 프로젝트 아이디어
1. **빌드 최적화**: 번들 크기 최적화
2. **배포 파이프라인**: CI/CD 파이프라인 구축
3. **환경 관리 가이드**: 환경변수 관리 가이드 작성
