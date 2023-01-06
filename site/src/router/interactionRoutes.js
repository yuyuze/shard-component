export default [
  {
    path: '/interaction/introduce',
    meta: {
      title: '介绍',
      category: 'interaction'
    },
    component: () => import('../interaction/presentation.md')
  }
];
