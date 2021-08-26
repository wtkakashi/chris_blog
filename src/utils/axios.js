import axios from 'axios';
import {API_BAISC_URL} from '@/config'

import {message} from 'antd'
import { getToken } from '@/utils';

//create an axios instance
const service = axios.create({
    baseURL: API_BAISC_URL,
    timeout: 10000
})
let timer;
service.interceptors.request.use(
    config => {
        const token = getToken();
        if(token) {
            config.headers.common['Authorization'] = token;
        }
        return config
    },
    error => {
        message.error('bed request');
        Promise.reject(error);
    }
)
service.interceptors.response.use(
    response => {
        return response.data
    },
    err =>{
        clearTimeout(timer);
        timer = setTimeout(()=>{
            if(err.response) {
                const {status, data} = err.response;
                switch(status) {
                    case 401:
                        message.error((data && data.message) || '登录信息过期或未授权，请重新登录')
                        break;
                    default:
                        message.error(data.message || `链接错误${status}`);
                        break;

                }
            } else {
                message.error(err.message);
            }
        },200)
        return Promise.reject(err)
    }
)
export default service