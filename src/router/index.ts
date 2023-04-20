import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/home/index.vue';
/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
    {
        name: 'home',
        path: '/',
        component: HomePage
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
