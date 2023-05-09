import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { registerStore } from '@/store';
import App from './App.vue';
import router from '@/router';
import '@/styles/index.less';
import '@/assets/iconfont/iconfont.css';

const store = createPinia();
const app = createApp(App);

app.use(router);
// 注册pinia状态管理库
app.use(store);
registerStore();
app.mount('#app');
