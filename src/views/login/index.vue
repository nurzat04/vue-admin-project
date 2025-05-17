<template>
    <div class="login_container">
    

        <el-switch
            v-model="isDark"
            inline-prompt
            active-text="🌙"
            inactive-text="☀️"
            @change="toggleDarkMode"
            />

        <el-row>
            <!-- 
            :span是占位的位子 
            xs是响应式布局，当页面变小到左侧时，写24的col就会变到左侧去
             -->
            <el-col :span="12" :xs="0" />
            <el-col :span="12" :xs="24">

            <!-- :model是指要将数据收集到哪里 -->
            <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                <h1>Hello</h1>
                <h2>Welcome back</h2>
    
                <el-form-item prop="username">
                <!-- 
                prefix-icon前缀图标
                suffix-icon后缀图标
                -->
                <el-input
                    :prefix-icon="User"
                    v-model="loginForm.username"
                    placeholder="Username"
                    @keyup.enter="login"
                />
                </el-form-item>
    
                <el-form-item prop="password">
                <el-input
                    :prefix-icon="Lock"
                    type="password"
                    v-model="loginForm.password"
                    show-password
                    placeholder="Password"
                    @keyup.enter="login"
                />
                </el-form-item>
    
                <el-form-item>
                <el-checkbox v-model="loginForm.rememberMe">Remember me</el-checkbox>
                </el-form-item>
    
                <el-link type="primary" @click="goToRegister">Register</el-link>
                <el-link type="primary" @click="goToForgotPassword">Forgot Password?</el-link>
    
                <el-form-item>
                <el-button :loading="loading" class="login_btn" type="primary" @click="login">Login</el-button>
                </el-form-item>
            </el-form>
            </el-col>
        </el-row>
    </div>
</template>
  
<script setup lang="ts">
    import { User, Lock } from "@element-plus/icons-vue"
    import { reactive, ref } from "vue"
    import { useRouter, useRoute} from "vue-router"
    import useUserStore from "../../store/modules/user"
    import { ElNotification } from "element-plus"
    import { getTimeOfDay } from "../../utils/time"

    const isDark = ref(false)

    const toggleDarkMode = () => {
    isDark.value
        ? document.documentElement.classList.add('dark')
        : document.documentElement.classList.remove('dark')
    }

    const userStore = useUserStore()
    const router = useRouter()
    const route = useRoute()
    const loading = ref(false)
    const loginForms = ref()
  
    const loginForm = reactive({
        username: '',
        password: '',
        rememberMe: false
    })
  
    const login = async () => {
        await loginForms.value.validate()
        loading.value = true
    
        try {
        await userStore.userLogin(loginForm)
        //判断登录的时候，路由路径当中是否又query参数，如果有就往query参数跳转，没有就跳转到首页
        let redirect : any = route.query.redirect;
        router.push({path: redirect || '/'})
        ElNotification({
            type: 'success',
            message: 'Welcome back!',
            title: `Hi, ${getTimeOfDay()}`
        })
        loading.value = false
        } catch (error) {
        loading.value = false
        ElNotification({
            type: 'error',
            message: (error as Error).message || 'Login failed'
        })
        }
    }
  
    const validatorUsername = (rule: any, value: any, callback: any) => {
        if (value.length >= 5 && value.length <= 10) {
        callback()
        } else {
        callback(new Error('Username must be 5-10 characters'))
        }
    }
    
    const validatorPassword = (rule: any, value: any, callback: any) => {
        if (value.length >= 6) {
        callback()
        } else {
        callback(new Error('Password must be at least 6 characters'))
        }
    }
    
    const rules = {
        username: [{ trigger: ['blur', 'change'], validator: validatorUsername }],
        password: [{ trigger: ['blur', 'change'], validator: validatorPassword }]
    }
    
    const goToRegister = () => router.push('/register')
    const goToForgotPassword = () => router.push('/forgot-password')

</script>
  
<style lang="scss" scoped>
    .login_container {
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, #f0f2f5, #c3d1f7);
        display: flex;
        align-items: center;
        justify-content: center;
  
        .el-row {
        width: 800px;
        background-color: #fff;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.1);
        border-radius: 16px;
        overflow: hidden;
        }
    
        .login_form {
            padding: 60px 40px;
            width: 100%;
            background-color: #fff;

            .dark & {
            background-color: #1e1e1e;
            color: #eee;
            }
    
            h1 {
                font-size: 32px;
                font-weight: bold;
                margin-bottom: 10px;
            }
        
            h2 {
                font-size: 20px;
                color: #888;
                margin-bottom: 30px;
            }
        
            .login_btn {
                width: 100%;
            }
        
            .login_links {
                margin-bottom: 20px;
                .el-link {
                font-size: 14px;
                }
            }
        }
    }
</style>
  