import { defineStore } from 'pinia'
//引入接口
import { reqLogin, reqUserInfo, reqLogOut } from '../../api/user'
//引入数据类型
import type {
    LoginFormData,
    LoginResponseData,
    userInfoResponseData,
} from '../../api/user/type'

import type { UserState } from './types/type'

import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '../../utils/token'

import { constantRoutes } from '../../router/routes'

const useUserStore = defineStore('User', {
    //存储数据
    state: (): UserState => {
        return {
            token: GET_TOKEN(),
            menuRoutes: constantRoutes, // 菜单路由
            username: '',
            avatar: '',
        }
    },

    actions: {
        async userLogin(data: LoginFormData) {
            //登录请求
            let result: LoginResponseData = await reqLogin(data)
            //登录请求：成功200 -> token
            //登录请求：失败201 -> 登录失败错误的信息
            if (result.code == 200) {

                this.token = (result.data as string)

                SET_TOKEN(result.data as string)
                //保证当前async函数返回一个成功的promise
                return 'ok';
            } else {
                return Promise.reject(new Error(result.data as string))
            }

        },

        async userInfo() {
            let result = await reqUserInfo()
            if (result.code == 200) {
                this.username = result.data.name as string;
                this.avatar = result.data.avatar as string;
                return 'ok';
            } else {
                return Promise.reject(new Error(result.message))
            }
        },

        async userLogout() {
            const res = await reqLogOut()
            if (res.code === 200) {
                this.token = ''
                this.username = ''
                this.avatar = ''
                REMOVE_TOKEN()

            } else {
                return Promise.reject(new Error(res.message))
            }
        }

    }
})

export default useUserStore