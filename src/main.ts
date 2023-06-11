import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { registerStore } from '@/store';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from '@/router';
import '@/styles/index.less';
import '@/assets/iconfont/iconfont.css';

const store = createPinia();
const app = createApp(App);

// 注册所有的 icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.use(router);
// 注册pinia状态管理库
app.use(store);
registerStore();
app.use(ElementPlus);
app.mount('#app');
