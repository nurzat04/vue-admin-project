import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css' // 关键步骤！
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './styles/index.scss'
import pinia from './store'
import { createI18n } from 'vue-i18n' //引入国际化
import 'virtual:svg-icons-register'
//引入自定义插件对象
import globalComponent from './components/index'
import './permission'
const app = createApp(App)

app.use(ElementPlus)

app.use(router)
// 注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(pinia)

const messages = {
    en: {
        login: 'Login',
        username: 'Username',
        password: 'Password',
        remember: 'Remember Me',
    },
    zh: {
        login: '登录',
        username: '用户名',
        password: '密码',
        remember: '记住我',
    }
}

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages
})

app.use(i18n)

//安装自定义插件
app.use(globalComponent)

app.mount('#app')
