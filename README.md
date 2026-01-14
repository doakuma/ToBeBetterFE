# ToBeBetterFE

프론트엔드 개발 실습을 위한 풀스택 프로젝트입니다. React 기반 프론트엔드와 Express 기반 백엔드로 구성되어 있으며, 실무에서 필요한 다양한 기술과 패턴을 학습할 수 있습니다.

## 📋 프로젝트 개요

이 프로젝트는 프론트엔드 개발자가 실무에서 필요한 지식을 단계적으로 학습하고 실습할 수 있도록 구성되었습니다. 백엔드 API 서버와 프론트엔드 애플리케이션을 함께 제공하여 실제 개발 환경과 유사한 경험을 제공합니다.

## 🏗️ 프로젝트 구조

```
ToBeBetterFE/
├── backend/          # Express 기반 REST API 서버
├── Dev/             # React + Vite 프론트엔드 애플리케이션
└── Docs/            # 프론트엔드 개발자 지식 체크리스트 및 학습 자료
```

### Backend (`backend/`)

실습용 Express 서버입니다. 인증, 사용자 관리, TODO 기능을 제공하는 REST API를 포함합니다.

**주요 기능:**
- JWT 기반 인증 (회원가입, 로그인)
- 사용자 관리 API
- TODO CRUD API
- 메모리 기반 데이터베이스 (실습용)

**기술 스택:**
- Express.js
- JWT (jsonwebtoken)
- bcryptjs (비밀번호 해시화)
- CORS
- dotenv

자세한 내용은 [backend/README.md](./backend/README.md)를 참고하세요.

### Frontend (`Dev/`)

React 19와 Vite를 사용한 프론트엔드 애플리케이션입니다.

**기술 스택:**
- React 19
- Vite
- React Router DOM
- TanStack React Query
- Axios
- React Hook Form
- Yup (폼 검증)
- Sentry (에러 트래킹)
- Vitest (테스트)
- Playwright (E2E 테스트)

**개발 도구:**
- ESLint
- Prettier
- TypeScript 지원 준비

### Docs (`Docs/`)

프론트엔드 개발자 지식 체크리스트와 학습 자료를 포함합니다.

- **A-1 ~ A-12**: 3단계 체크 기준 (Lv1/Lv2/Lv3)
- **B-1 ~ B-3**: 트랙별 체크리스트 (면접용/실무용/시니어용)

자세한 내용은 [Docs/README.md](./Docs/README.md)를 참고하세요.

## 🚀 시작하기

### 사전 요구사항

- Node.js 18 이상
- pnpm (권장) 또는 npm

### 1. 저장소 클론

```bash
git clone <repository-url>
cd ToBeBetterFE
```

### 2. Backend 설정

```bash
cd backend

# 의존성 설치
pnpm install

# 환경 변수 설정 (.env 파일이 없으면 생성)
# PORT=3001
# JWT_SECRET=your-secret-key-change-in-production
# NODE_ENV=development

# 개발 서버 실행
pnpm dev
```

서버가 `http://localhost:3001`에서 실행됩니다.

### 3. Frontend 설정

```bash
cd Dev

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

프론트엔드가 `http://localhost:3000`에서 실행됩니다.

### 4. API 테스트

백엔드 서버가 실행 중일 때 Health Check를 확인할 수 있습니다:

```bash
curl http://localhost:3001/health
```

## 📚 API 엔드포인트

### 인증

- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `GET /api/auth/me` - 현재 사용자 정보 조회

### 사용자

모든 사용자 API는 인증이 필요합니다 (`Authorization: Bearer {token}` 헤더 필요).

- `GET /api/users` - 사용자 목록 조회
- `GET /api/users/:id` - 사용자 상세 조회
- `PUT /api/users/:id` - 사용자 정보 수정
- `DELETE /api/users/:id` - 사용자 삭제

### TODO

모든 TODO API는 인증이 필요하며, 본인의 TODO만 조회/수정/삭제할 수 있습니다.

- `GET /api/todos` - TODO 목록 조회
- `GET /api/todos/:id` - TODO 상세 조회
- `POST /api/todos` - TODO 생성
- `PUT /api/todos/:id` - TODO 수정
- `DELETE /api/todos/:id` - TODO 삭제

자세한 API 문서는 [backend/README.md](./backend/README.md)를 참고하세요.

## 🛠️ 개발 스크립트

### Backend

```bash
cd backend

pnpm dev      # 개발 모드 (자동 재시작)
pnpm start    # 프로덕션 모드
```

### Frontend

```bash
cd Dev

pnpm dev              # 개발 서버 실행
pnpm build            # 프로덕션 빌드
pnpm preview          # 빌드 결과 미리보기
pnpm lint             # ESLint 검사
pnpm lint:fix         # ESLint 자동 수정
pnpm format           # Prettier 포맷팅
pnpm format:check     # Prettier 검사
pnpm test             # Vitest 실행
pnpm test:ui          # Vitest UI 모드
pnpm test:coverage    # 테스트 커버리지
pnpm test:e2e         # Playwright E2E 테스트
pnpm test:e2e:ui      # Playwright UI 모드
```

## 📖 학습 가이드

### 1단계: 기본 설정 확인

1. Backend와 Frontend 서버가 정상적으로 실행되는지 확인합니다.
2. Health Check API를 호출하여 백엔드 연결을 확인합니다.
3. 브라우저에서 프론트엔드 애플리케이션이 정상적으로 로드되는지 확인합니다.

### 2단계: API 연동 실습

1. **인증 구현**
   - 회원가입 폼 구현
   - 로그인 폼 구현
   - JWT 토큰 저장 및 관리

2. **데이터 페칭**
   - React Query를 사용한 데이터 페칭
   - 로딩/에러/빈 상태 처리
   - 캐시 및 리프레시 전략

3. **TODO 애플리케이션**
   - TODO 목록 조회
   - TODO 생성/수정/삭제
   - 완료 상태 토글

### 3단계: 고급 기능 실습

1. **폼 처리**
   - React Hook Form을 사용한 폼 관리
   - Yup을 사용한 검증
   - 서버 에러 처리

2. **라우팅**
   - React Router를 사용한 페이지 라우팅
   - 보호된 라우트 구현
   - 401 에러 처리 및 리다이렉트

3. **에러 처리**
   - 에러 바운더리 구현
   - Sentry를 사용한 에러 트래킹
   - 사용자 친화적인 에러 메시지

### 4단계: 테스트 작성

1. **단위 테스트**
   - Vitest를 사용한 컴포넌트 테스트
   - 유틸리티 함수 테스트

2. **통합 테스트**
   - API 연동 테스트
   - 사용자 플로우 테스트

3. **E2E 테스트**
   - Playwright를 사용한 E2E 테스트
   - 주요 사용자 시나리오 테스트

## 📝 체크리스트 활용

`Docs/` 폴더의 체크리스트를 활용하여 학습 진도를 관리할 수 있습니다:

- **옵션 A**: 3단계 체크 기준 (Lv1/Lv2/Lv3)
- **옵션 B**: 트랙별 체크리스트 (면접용/실무용/시니어용)

각 항목을 실습하면서 체크리스트를 업데이트하며 학습 진도를 추적하세요.

## 🔐 보안 참고사항

이 프로젝트는 **실습용**으로 제작되었습니다. 프로덕션 환경에서 사용할 경우 다음 사항을 고려해야 합니다:

- 실제 데이터베이스 사용 (PostgreSQL, MongoDB 등)
- 환경 변수 보안 관리
- Rate limiting 구현
- 입력 검증 강화
- HTTPS 사용
- CORS 정책 세분화

## 🤝 기여

이 프로젝트는 학습 목적으로 만들어졌습니다. 개선 사항이나 버그 리포트는 언제든 환영합니다!

## 📄 라이선스

이 프로젝트는 학습 목적으로 자유롭게 사용할 수 있습니다.

---

**Happy Coding! 🚀**
