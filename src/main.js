import { createApp } from 'vue'
// 组件库
// import TDesign from 'tdesign-vue-next';
// import 'tdesign-vue-next/es/style/index.css';

import App from './App.vue'
// 全局样式
import '@/style/index.scss';
// 权限-路由拦截
import './permission';
// 数据存储、路由
import { store } from './store';
import router from './router';

const app = createApp(App);

// app.use(TDesign);
app.use(store);
app.use(router);

app.mount('#app')
