import Layout from '@/pages/layouts/index.vue';
import DashboardIcon from '@/assets/assets-slide-dashboard.svg';

export default [
  {
    path: '/main',
    component: Layout,
    redirect: '/main/index',
    name: 'main',
    meta: { title: '仪表盘', icon: DashboardIcon },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/pages/main/index.vue'),
        meta: { title: '首页' },
      }
    ],
  },
];
