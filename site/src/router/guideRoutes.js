export default [
  {
    path: '/guide/introduce',
    meta: {
      title: '介绍',
      category: 'guide'
    },
    component: () => import('../guide/presentation.md')
  },
  {
    path: '/guide/getting-started',
    meta: {
      title: '快速上手',
      category: 'guide',
      // type: '图表'
    },
    component: () => import('../guide/getting-started.md')
  },
  {
    path: '/guide/development-guide',
    meta: {
      title: '开发指南',
      category: 'guide'
    },
    component: () => import('../guide/development-guide.md')
  },
  {
    path: '/guide/changelog',
    meta: {
      title: '更新日志',
      category: 'guide'
    },
    component: () => import('../guide/changelog.md')
  }
];
