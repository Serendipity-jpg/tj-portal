import { createApp } from 'vue'
import App from './App.vue'
import '@/style/index.less';
import './permission';

import { store } from './store';
import router from './router';

app.use(store);
app.use(router);

createApp(App).mount('#app')
