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
]
