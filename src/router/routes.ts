export const constantRoutes = [
    {
        name: 'login',
        path: '/login',
        component: () => import('../views/login/index.vue'),
        meta: {
            title: 'login', // 国际化的key
            icon: 'UserFilled', // 图标
            hidden: true, // 是否隐藏在菜单中
        }
    },
    {
        name: 'layout',
        path: '/',
        component: () => import('../layout/index.vue'),
        meta: {
            title: '', // 国际化的key
            icon: '', // 图标
            hidden: false, // 是否隐藏在菜单中
        },
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/home/index.vue'),
                meta: {
                    title: '首页', // 国际化的key
                    icon: 'House', // 图标
                    hidden: false, // 是否隐藏在菜单中
                }
            },
        ]
    },
    {
        name: '404',
        path: '/404',
        component: () => import('../views/404/index.vue'),
        meta: {
            title: '404', // 国际化的key
            icon: 'MoreFilled', // 图标
            hidden: true, // 是否隐藏在菜单中
        }
    },
    {
        path: '/screen',
        component: () => import('../views/screen/index.vue'),
        name: 'Screen',
        meta: {
            title: '数据大屏', // 国际化的key
            icon: 'DataBoard', // 图标
            hidden: false, // 是否隐藏在菜单中
        }
    },
    {
        path: '/acl',
        component: () => import('../layout/index.vue'),
        name: 'Acl',
        meta: {
            title: '权限管理',
            icon: 'Lock',
            hidden: false,
        },
        redirect: '/acl/user',
        children: [
            {
                path: '/acl/user',
                name: 'User',
                component: () => import('../views/acl/user/index.vue'),
                meta: {
                    title: '用户管理',
                    icon: 'User',
                    hidden: false,
                }
            },
            {
                path: '/acl/role',
                name: 'Role',
                component: () => import('../views/acl/role/index.vue'),
                meta: {
                    title: '角色管理',
                    hidden: false,
                    icon: 'User',
                }
            },
            {
                path: '/acl/permission',
                name: 'Permission',
                component: () => import('../views/acl/permission/index.vue'),
                meta: {
                    title: '菜单管理',
                    icon: 'Memo',
                    hidden: false,
                }
            }
        ]
    },
    {
        path: '/product',
        component: () => import('../layout/index.vue'),
        name: 'Product',
        meta: {
            title: '商品管理',
            icon: 'Goods',
            hidden: false,
        },
        redirect: '/product/brand',
        //为什么写这个？因为当用户点击这个商品管理的时候，如果不写这个的话，就会跳到layout页面，也就是空页面，
        //写了这个以后，就会跳转到品牌管理页面
        children: [
            {
                path: '/product/brand',
                component: () => import('../views/product/brand/index.vue'),
                name: 'Brand',
                meta: {
                    title: '品牌管理',
                    icon: 'ShoppingTrolley',
                    hidden: false,

                },

            },
            {
                path: '/product/attr',
                component: () => import('../views/product/attr/index.vue'),
                name: 'Attr',
                meta: {
                    title: '属性管理',
                    icon: 'User',
                    hidden: false,

                }

            },
            {
                path: '/product/spu',
                component: () => import('../views/product/spu/index.vue'),
                name: 'Spu',
                meta: {
                    title: 'SPU管理',
                    icon: 'Calendar',
                    hidden: false,

                }

            },
            {
                path: '/product/sku',
                component: () => import('../views/product/sku/index.vue'),
                name: 'Sku',
                meta: {
                    title: 'SKU管理',
                    icon: 'Orange',
                    hidden: false,

                }

            }
        ]
    },
    {
        //任意路由，
        //任意写个路由，匹配不到的路由都会重定向到404页面
        name: 'any',
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        meta: {
            title: 'any', // 国际化的key
            icon: 'MoreFilled', // 图标
            hidden: true, // 是否隐藏在菜单中
        }
    }
]