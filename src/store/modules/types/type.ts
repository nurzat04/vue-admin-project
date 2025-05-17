import type { RouteRecordRaw } from "vue-router";

export interface UserState {
    token: string | null; // 用户唯一标识token
    menuRoutes: RouteRecordRaw[]; // 菜单路由
    username: string | null; // 用户名
    avatar: string; // 用户头像
}
