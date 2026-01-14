# 실습용 Express 서버

프론트엔드 개발 실습을 위한 REST API 서버입니다.

## 🚀 시작하기

### 1. 의존성 설치

npm 또는 pnpm을 사용할 수 있습니다:

```bash
cd backend

# npm 사용
npm install

# 또는 pnpm 사용 (권장)
pnpm install
```

### 2. 환경 변수 설정

`.env.example` 파일을 참고하여 `.env` 파일을 생성합니다:

```bash
cp .env.example .env
```

`.env` 파일 내용:
```
PORT=3001
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

### 3. 서버 실행

```bash
# 개발 모드 (자동 재시작)
npm run dev
# 또는
pnpm dev

# 프로덕션 모드
npm start
# 또는
pnpm start
```

서버가 `http://localhost:3001`에서 실행됩니다.

## 📚 API 엔드포인트

### 인증 (Auth)

#### 회원가입
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name"
}
```

#### 로그인
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

응답:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

#### 현재 사용자 정보 조회
```http
GET /api/auth/me
Authorization: Bearer {token}
```

### 사용자 (Users)

모든 사용자 API는 인증이 필요합니다 (`Authorization: Bearer {token}` 헤더 필요).

#### 사용자 목록 조회
```http
GET /api/users
Authorization: Bearer {token}
```

#### 사용자 상세 조회
```http
GET /api/users/:id
Authorization: Bearer {token}
```

#### 사용자 정보 수정
```http
PUT /api/users/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```

#### 사용자 삭제
```http
DELETE /api/users/:id
Authorization: Bearer {token}
```

### TODO

모든 TODO API는 인증이 필요하며, 본인의 TODO만 조회/수정/삭제할 수 있습니다.

#### TODO 목록 조회
```http
GET /api/todos
Authorization: Bearer {token}
```

#### TODO 상세 조회
```http
GET /api/todos/:id
Authorization: Bearer {token}
```

#### TODO 생성
```http
POST /api/todos
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "할 일 제목",
  "description": "할 일 설명 (선택사항)"
}
```

#### TODO 수정
```http
PUT /api/todos/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "수정된 제목",
  "description": "수정된 설명",
  "completed": true
}
```

#### TODO 삭제
```http
DELETE /api/todos/:id
Authorization: Bearer {token}
```

## 🔧 기술 스택

- **Express**: 웹 프레임워크
- **CORS**: Cross-Origin Resource Sharing 지원
- **JWT**: JSON Web Token 인증
- **bcryptjs**: 비밀번호 해시화
- **dotenv**: 환경 변수 관리

## 📁 프로젝트 구조

```
backend/
├── server.js              # 메인 서버 파일
├── package.json           # 의존성 및 스크립트
├── .env.example          # 환경 변수 예시
├── routes/               # API 라우트
│   ├── auth.js          # 인증 관련 라우트
│   ├── users.js         # 사용자 관련 라우트
│   └── todos.js         # TODO 관련 라우트
├── middleware/          # 미들웨어
│   ├── auth.js         # JWT 인증 미들웨어
│   └── error.js        # 에러 처리 미들웨어
└── data/               # 데이터 저장소
    └── db.js           # 메모리 DB (실습용)
```

## 💡 실습 팁

1. **인증 토큰 사용**: 로그인 후 받은 토큰을 `Authorization: Bearer {token}` 헤더에 포함하여 요청합니다.

2. **에러 처리**: API는 표준 HTTP 상태 코드를 사용합니다:
   - `200`: 성공
   - `201`: 생성 성공
   - `400`: 잘못된 요청
   - `401`: 인증 필요
   - `403`: 권한 없음
   - `404`: 리소스 없음
   - `409`: 충돌 (중복 등)
   - `500`: 서버 에러

3. **메모리 DB**: 현재는 메모리 기반 DB를 사용하므로 서버 재시작 시 데이터가 초기화됩니다. 실제 프로젝트에서는 데이터베이스로 교체해야 합니다.

## 🔐 보안 참고사항

- 현재는 실습용 서버이므로 프로덕션 환경에서는 다음을 고려해야 합니다:
  - 데이터베이스 사용 (PostgreSQL, MongoDB 등)
  - 환경 변수 보안 관리
  - Rate limiting
  - 입력 검증 강화
  - HTTPS 사용
