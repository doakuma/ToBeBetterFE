export const docsConfig = [
  {
    id: 'rendering',
    title: 'A-1. 화면/렌더링',
    folder: 'A-1-Rendering',
    practices: [
      {
        id: 'scroll-performance',
        title: '스크롤 성능 이슈',
        level: 'Lv1',
        description: 'DOM/CSSOM, Layout/Paint/Composite 차이를 설명할 수 있습니다.',
        component: () => import('../pages/practices/Rendering/ScrollPerformance'),
      },
      {
        id: 'cls',
        title: '레이아웃 점프',
        level: 'Lv2',
        description: 'CLS가 발생하는 대표 원인을 설명할 수 있습니다.',
        component: () => import('../pages/practices/Rendering/CLS'),
      },
      {
        id: 'modal',
        title: '모달/오버레이 UX',
        level: 'Lv2',
        description: '모달/오버레이 UX를 설명할 수 있습니다.',
        component: () => import('../pages/practices/Rendering/Modal'),
      },
      {
        id: 'z-index',
        title: 'z-index/겹침 문제',
        level: 'Lv3',
        description: 'z-index/겹침 문제를 설명할 수 있습니다.',
        component: () => import('../pages/practices/Rendering/ZIndex'),
      },
    ],
  },
  {
    id: 'state-react',
    title: 'A-2. 상태/React',
    folder: 'A-2-State-React',
    practices: [
      {
        id: 'use-effect',
        title: 'useEffect 의존성/무한 루프',
        level: 'Lv1',
        description: '의존성 배열과 stale closure를 설명할 수 있습니다.',
        component: () => import('../pages/practices/StateReact/UseEffect'),
      },
      {
        id: 're-render',
        title: '리렌더 과다',
        level: 'Lv2',
        description: '리렌더 과다 문제를 해결할 수 있습니다.',
        component: () => import('../pages/practices/StateReact/ReRender'),
      },
      {
        id: 'state-boundary',
        title: '상태 경계(로컬/전역/서버 상태)',
        level: 'Lv2',
        description: '상태 경계를 올바르게 설계할 수 있습니다.',
        component: () => import('../pages/practices/StateReact/StateBoundary'),
      },
      {
        id: 'list-key',
        title: '리스트 key/입력값 튐',
        level: 'Lv3',
        description: '리스트 key와 입력값 튐 문제를 해결할 수 있습니다.',
        component: () => import('../pages/practices/StateReact/ListKey'),
      },
    ],
  },
  {
    id: 'api-network',
    title: 'A-3. API/네트워크',
    folder: 'A-3-API-Network',
    practices: [
      {
        id: 'loading-error-empty',
        title: '로딩/에러/빈 상태 처리',
        level: 'Lv1',
        description: '사용자 경험 관점에서 세 상태의 필요성을 설명할 수 있습니다.',
        component: () => import('../pages/practices/APINetwork/LoadingErrorEmpty'),
      },
      {
        id: 'request-cancel',
        title: '요청 취소/중복 요청 방지',
        level: 'Lv2',
        description: '요청 취소와 중복 요청 방지를 구현할 수 있습니다.',
        component: () => import('../pages/practices/APINetwork/RequestCancel'),
      },
      {
        id: 'cors',
        title: 'CORS / preflight',
        level: 'Lv2',
        description: 'CORS와 preflight 요청을 이해할 수 있습니다.',
        component: () => import('../pages/practices/APINetwork/CORS'),
      },
      {
        id: 'cache',
        title: '캐시/신선도',
        level: 'Lv3',
        description: '캐시와 신선도 관리를 구현할 수 있습니다.',
        component: () => import('../pages/practices/APINetwork/Cache'),
      },
    ],
  },
  {
    id: 'auth-security',
    title: 'A-4. 인증/보안',
    folder: 'A-4-Auth-Security',
    practices: [
      {
        id: 'auth-methods',
        title: '인증 방식 이해',
        level: 'Lv1',
        description: '다양한 인증 방식을 이해할 수 있습니다.',
        component: () => import('../pages/practices/AuthSecurity/AuthMethods'),
      },
      {
        id: 'xss-csrf',
        title: 'XSS/CSRF',
        level: 'Lv2',
        description: 'XSS와 CSRF 공격을 방어할 수 있습니다.',
        component: () => import('../pages/practices/AuthSecurity/XSSCSRF'),
      },
    ],
  },
  {
    id: 'form-input',
    title: 'A-5. 폼/입력',
    folder: 'A-5-Form-Input',
    practices: [
      {
        id: 'controlled-uncontrolled',
        title: 'controlled/uncontrolled 및 검증',
        level: 'Lv1',
        description: 'controlled와 uncontrolled 컴포넌트를 구분할 수 있습니다.',
        component: () => import('../pages/practices/FormInput/ControlledUncontrolled'),
      },
      {
        id: 'file-upload',
        title: '파일 업로드',
        level: 'Lv2',
        description: '파일 업로드를 구현할 수 있습니다.',
        component: () => import('../pages/practices/FormInput/FileUpload'),
      },
      {
        id: 'ime-mobile',
        title: 'IME/모바일 입력',
        level: 'Lv3',
        description: 'IME와 모바일 입력 이슈를 해결할 수 있습니다.',
        component: () => import('../pages/practices/FormInput/IMEMobile'),
      },
    ],
  },
  {
    id: 'accessibility',
    title: 'A-6. 접근성(A11y)',
    folder: 'A-6-Accessibility',
    practices: [
      {
        id: 'semantic-keyboard',
        title: '시맨틱/키보드 내비게이션',
        level: 'Lv1',
        description: '시맨틱 태그와 키보드 접근성의 중요성을 설명할 수 있습니다.',
        component: () => import('../pages/practices/Accessibility/SemanticKeyboard'),
      },
    ],
  },
  {
    id: 'style-design-system',
    title: 'A-7. 스타일/디자인 시스템',
    folder: 'A-7-Style-DesignSystem',
    practices: [
      {
        id: 'tokens-theme',
        title: '토큰/테마/variant',
        level: 'Lv1',
        description: '디자인 토큰과 테마 시스템을 이해할 수 있습니다.',
        component: () => import('../pages/practices/StyleDesignSystem/TokensTheme'),
      },
      {
        id: 'css-scope',
        title: 'CSS 스코프/우선순위',
        level: 'Lv2',
        description: 'CSS 스코프와 우선순위를 이해할 수 있습니다.',
        component: () => import('../pages/practices/StyleDesignSystem/CSSScope'),
      },
    ],
  },
  {
    id: 'performance',
    title: 'A-8. 성능',
    folder: 'A-8-Performance',
    practices: [
      {
        id: 'core-web-vitals',
        title: 'Core Web Vitals',
        level: 'Lv1',
        description: 'LCP/INP/CLS 의미를 설명할 수 있습니다.',
        component: () => import('../pages/practices/Performance/CoreWebVitals'),
      },
    ],
  },
  {
    id: 'error-observability',
    title: 'A-9. 에러 처리/관측성',
    folder: 'A-9-Error-Observability',
    practices: [
      {
        id: 'error-boundary',
        title: '에러 UX/에러 바운더리/트래킹',
        level: 'Lv1',
        description: '사용자 메시지/로깅/복구 UX를 구분해 설명할 수 있습니다.',
        component: () => import('../pages/practices/ErrorObservability/ErrorBoundary'),
      },
    ],
  },
  {
    id: 'testing',
    title: 'A-10. 테스트',
    folder: 'A-10-Testing',
    practices: [
      {
        id: 'test-strategy',
        title: '테스트 전략',
        level: 'Lv1',
        description: '단위/컴포넌트/E2E 테스트 목적과 비용을 설명할 수 있습니다.',
        component: () => import('../pages/practices/Testing/TestStrategy'),
      },
    ],
  },
  {
    id: 'build-deploy-env',
    title: 'A-11. 빌드/배포/환경',
    folder: 'A-11-Build-Deploy-Env',
    practices: [
      {
        id: 'bundle-cache',
        title: '번들/캐시/소스맵',
        level: 'Lv1',
        description: '번들링, 트리 쉐이킹, 소스맵의 의미를 설명할 수 있습니다.',
        component: () => import('../pages/practices/BuildDeployEnv/BundleCache'),
      },
    ],
  },
  {
    id: 'collaboration',
    title: 'A-12. 협업',
    folder: 'A-12-Collaboration',
    practices: [
      {
        id: 'pr-review',
        title: 'PR/리뷰/문서화',
        level: 'Lv1',
        description: '좋은 PR 단위와 리뷰 관점을 설명할 수 있습니다.',
        component: () => import('../pages/practices/Collaboration/PRReview'),
      },
    ],
  },
  {
    id: 'interview',
    title: 'B-1. 취업 면접용',
    folder: 'B-1-Interview',
    practices: [
      {
        id: 'interview-checklist',
        title: '면접 체크리스트',
        level: 'Lv1',
        description: '취업 면접을 위한 핵심 지식을 설명할 수 있습니다.',
        component: () => import('../pages/practices/Interview/InterviewChecklist'),
      },
    ],
  },
  {
    id: 'practical',
    title: 'B-2. 실무 적응용',
    folder: 'B-2-Practical',
    practices: [
      {
        id: 'practical-checklist',
        title: '실무 체크리스트',
        level: 'Lv1',
        description: '실무에서 바로 적용할 수 있는 핵심 지식을 설명할 수 있습니다.',
        component: () => import('../pages/practices/Practical/PracticalChecklist'),
      },
    ],
  },
  {
    id: 'senior',
    title: 'B-3. 시니어 성장용',
    folder: 'B-3-Senior',
    practices: [
      {
        id: 'senior-checklist',
        title: '시니어 체크리스트',
        level: 'Lv1',
        description: '시니어 개발자로 성장하기 위한 고급 지식을 설명할 수 있습니다.',
        component: () => import('../pages/practices/Senior/SeniorChecklist'),
      },
    ],
  },
]
