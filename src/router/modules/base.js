import Layout from '@/pages/layouts/index.vue';
import DashboardIcon from '@/assets/assets-slide-dashboard.svg';

export default [
  {
    path: '/main',
    component: Layout,
    redirect: '/main/index',
    name: 'main',
    meta: { title: '首页' },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/pages/main/index.vue'),
        meta: { title: '首页' },
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('@/pages/main/coupon.vue'),
        meta: { title: '首页' },
      }
    ],
  },
  {
    path: '/search',
    component: Layout,
    name: 'search',
    redirect: '/search/index',
    meta: { title: '课程搜索' },
    children: [
      {
        path: 'index',
        name: 'search',
        component: () => import('@/pages/classSearch/index.vue'),
        meta: { title: '课程搜索' },
      }
    ],
  },
  {
    path: '/details',
    component: Layout,
    name: 'details',
    redirect: '/details/index',
    meta: { title: '课程详情' },
    children: [
      {
        path: 'index',
        name: 'details',
        component: () => import('@/pages/classDetails/index.vue'),
        meta: { title: '课程搜索' },
      }
    ],
  },
];
