import axios from 'axios';
import { ElMessage } from 'element-plus';
import useUserStore from '../store/modules/user';

//1.利用axios对象的create方法，去创建axios实例（其他的配置：基础路径，超时的时间）
let request = axios.create({
    //基础路径
    baseURL: import.meta.env.VITE_APP_BASE_API,//基础路径上会携带/api
    timeout: 5000,//超时时间
});
//2.request实例添加请求和响应拦截器
request.interceptors.request.use((config) => {
    //config配置对象，headers请求头属性，params查询参数，data请求体参数,经常给服务器携带公共参数
    //返回配置对象
    //获取用户相关的小仓库，获取仓库内部token,登录成功以后携带给服务器
    let userStore = useUserStore();
    if (userStore.token) {
        //config.headers.Authorization = `Bearer ${userStore.token}`;
        config.headers.token = userStore.token;
    }
    return config;
});
//3.响应拦截器
request.interceptors.response.use((response) => {
    //返回响应数据
    return response.data;
}, (error) => {
    //存储网络错误信息
    let message = '';
    let status = error.response.status;
    switch (status) {
        case 400:
            message = '请求错误';
            break;
        case 401:
            message = '未授权，请登录';
            break;
        case 403:
            message = '拒绝访问';
            break;
        case 404:
            message = '请求地址出错';
            break;
        case 408:
            message = '请求超时';
            break;
        case 500:
            message = '服务器内部错误';
            break;
        case 501:
            message = '服务未实现';
            break;
        case 502:
            message = '网关错误';
            break;
        case 503:
            message = '服务不可用';
            break;
        case 504:
            message = '网关超时';
            break;
        default:
            message = `连接错误${error.response.status}`;
    }
    //提示错误信息
    ElMessage.error({
        type: 'error',
        message: message,
    });
    //返回一个失败的Promise对象
    return Promise.reject(error);
});

export default request;