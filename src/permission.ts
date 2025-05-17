//路由的权限设置（某个路由什么条件下可以访问，什么条件下不可以访问）
import router from './router';
import setting from './setting'
import nprogress from 'nprogress';
//引入进度条的样式
import 'nprogress/nprogress.css';
//小仓库
import useUserStore from './store/modules/user';
//大仓库
import pinia from './store'
let userStore = useUserStore(pinia);

// let whiteList = ['/login']; //白名单，无需权限校验的路由

// router.beforeEach(async (to, from, next) => {
//     // 进度条开始
//     nprogress.start()
//     // 白名单直接进入
//     if (whiteList.includes(to.path)) {
//         next()
//     } else {
//         // 非白名单，需要校验权限
//         const userStore = useUserStore();
//         if (userStore.token) {
//             // 用户已登录，可以访问所有路由
//             next()
//         } else {
//             // 用户未登录，跳转到登录页面
//             next('/login')
//         }
//     }
// })

// router.afterEach(() => {
//     // 进度条结束
//     nprogress.done()
// })



//全局守卫：项目当中任意路由切换都会触发的钩子
//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
    document.title = `${to.meta.title} | ${setting.title}`;
    //访问某个路由之前守卫
    //to: 即将进入的目标路由对象。
    // from: 当前导航正要离开的路由。
    // next: 控制路由跳转的函数。
    nprogress.start()
    next()
    //等把后端做好后，再打开吧
    // let token = userStore.token;
    // let username = userStore.username;
    // if (token) {
    //     if (to.path === '/login') {
    //         next({ path: '/' })
    //     } else {
    //         if (username) {
    //             next()
    //         } else {
    //             try {
    //                 await userStore.userInfo()
    //                 next()
    //             } catch (err) {
    //                 //token过期，获取不到用户信息了
    //                 //用户手动修改本地存储token
    //                 //退出登录->用户相关的数据清空
    //                 await userStore.userLogout()
    //                 next({ path: '/login', query: { redirect: to.path } })
    //             }
    //         }
    //     }
    // } else {
    //     if (to.path === '/login') {
    //         next()
    //     } else {
    //         next({ path: '/login', query: { redirect: to.path } })
    //     }
    // }
})

//全局后置守卫
router.afterEach((to: any, from: any) => {
    nprogress.done()
})

//用户未登录：可以访问login,其余六个路由不能访问[指向login]
//用户登陆成功：不可以访问login[指向首页],其余六个路由可以访问[指向对应页面]


