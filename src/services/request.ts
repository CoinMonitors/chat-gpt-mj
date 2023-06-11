import axios, { AxiosError, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';
import { RequestEnums } from '@/services/enumerable';
import { getStorage } from '@/utils/localStorage';
import { ElMessage } from 'element-plus';
const config: CreateAxiosDefaults = {
    // 设置超时时间
    timeout: RequestEnums.TIMEOUT,
    // 跨域时候允许携带凭证
    withCredentials: true,
    baseURL: import.meta.env.VITE_APP_API_BASE_URL
};

// 实例化axios
const service = axios.create(config);

/**
 * 请求拦截器
 * 客户端发送请求 -> [请求拦截器] -> 服务器
 * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
 */
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getStorage('X-token') || '';
        // 防止重复提交token
        config.headers.set('X-token', `${token}`); // 请求头中携带token信息
        return config;
    },
    (error: AxiosError) => {
        // 请求报错
        Promise.reject(error);
    }
);

/**
 * 响应拦截器
 * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
 */
service.interceptors.response.use(
    (response: AxiosResponse) => {
        const headers = response.headers;
        if (headers['content-type'] && headers['content-type'].split(';')[0] === 'application/octet-stream') {
            return response;
        } else {
            console.log(response, 'response');
            if (response.data.code !== 200) {
                ElMessage({
                    message: response.data.msg,
                    type: 'error'
                });
            }
            return response.data;
        }
    },
    (error: AxiosError) => {
        const { response } = error;
        if (response) {
            handleCode(response.status);
        }
        if (!window.navigator.onLine) {
            alert('网络连接失败'); // 可以跳转到错误页面，也可以不做操作  return router.replace({  path: '/404' });
        }
        return Promise.reject(error);
    }
);

function handleCode(code: number): void {
    let message = '';
    switch (code) {
        case 404: {
            message = '接口信息不存在,请确认';
            break;
        }
        case 502: {
            message = '资源部署中...请稍候';
            break;
        }
        case 504: {
            message = '后端服务超时...请稍后重试';
            break;
        }
        default: {
            message = '请求出错';
            break;
        }
    }
    alert(message);
}

export default service;
