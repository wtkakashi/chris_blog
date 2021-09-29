/*
 * @Author: your name
 * @Date: 2021-08-25 10:49:20
 * @LastEditTime: 2021-09-23 14:24:46
 * @LastEditors: Please set LastEditors
 * @Description: user info
 * @FilePath: /chris_blog/src/store/user/actions.js
 */
import * as TYPES from '@/store/types'
import axios from '@/utils/axios'
import {API_BAISC_URL} from '@/config'
import {message} from 'antd'
export const login = params =>{
    return dispatch =>  
    axios.post(`${API_BAISC_URL}/log/login`, params).then(res =>{
        dispatch({
            type: TYPES.USER_LOGIN,
            payload: res
        })
        message.success(`login success`);
        return res;
    })
}
export const register = params => {
    return dispatch =>
    axios.post(`${API_BAISC_URL}/log/register`).then(res => {
        message.success('注册成功，请重新登录您的账号')
    })
}

export const loginout = () => ({
    type: TYPES.USER_LOGIN_OUT
})