/* eslint-disable import/no-unresolved */
import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '../layouts/index.vue';
import demoRoutes from './demoRoutes';
import temRoutes from './temRoutes';
import guideRoutes from './guideRoutes';
import designRoutes from './designRoutes';
import interactionRoutes from './interactionRoutes';

export const routes = [
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/introduce',
    meta: {
      title: '指南',
      key: 'guide'
    },
    children: [...guideRoutes]
  },
  {
    path: '/components',
    component: Layout,
    redirect: '/components/overview',
    meta: {
      title: '组件',
      key: 'components'
    },
    children: [
      {
        path: 'overview',
        component: () => import('../views/ComponentOverview.vue')
      },
      ...demoRoutes
    ]
  },
  {
    path: '/template',
    component: Layout,
    meta: {
      title: 'LowCode',
      key: 'template'
    },
    // redirect: '/template/overview',
    children: [
      // {
      //   path: 'overview',
      //   component: () => import('../views/ComponentOverview.vue')
      // },
      ...temRoutes
    ]
  },
  {
    path: '/design',
    component: Layout,
    redirect: '/design/introduce',
    meta: {
      title: '设计规范',
      key: 'design'
    },
    children: [...designRoutes]
  },
  {
    path: '/interaction',
    component: Layout,
    redirect: '/interaction/introduce',
    meta: {
      title: '交互规范',
      key: 'interaction'
    },
    children: [...interactionRoutes]
  },
  { path: '/:*', redirect: '/components' }
];

export default createRouter({
  history: createWebHashHistory(),
  fallback: false,
  routes,
  scrollBehavior: (to) => {
    if (to.hash) {
      return { el: to.hash, top: 80, behavior: 'auto' };
    }
    return {};
  }
});
