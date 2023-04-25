import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/home/index.vue';
import startCreation from '@/views/start-creation/index.vue';
/**
 * 定义路由
 */
const routes: Array<RouteRecordRaw> = [
    {
        name: 'home',
        path: '/',
        component: HomePage
    },
    {
        name: 'start-creation',
        path: '/start-creation',
        component: startCreation
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
