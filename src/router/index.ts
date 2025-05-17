import { createRouter, createWebHistory } from 'vue-router';
import { constantRoutes } from './routes';

// 创建路由器实例
const router = createRouter({
    history: createWebHistory(), // 如果部署在子路径下，这里可以传 base: '/your-sub-path'
    routes: constantRoutes,
    scrollBehavior() {
        return { top: 0 }; // 切换页面自动滚动到顶部
    }
});

export default router;
