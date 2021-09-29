/*
 * @Author: your name
 * @Date: 2021-08-25 10:49:29
 * @LastEditTime: 2021-09-15 15:12:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /chris_blog/src/store/user/reducer.js
 */
import * as TYPES from '@/store/types'
import {saveStorage, getStorage, removeStorage} from '@/utils/storage'

const userInfo = getStorage('userInfo');
let defaultState = {
    username: '',
    role: 2,
    userId: 0,
}
if(userInfo) {
    defaultState = {...defaultState, ...userInfo};
}
function UserReducer(state = defaultState, action) {
    const {type, payload} = action
    switch (type) {
        case TYPES.USER_LOGIN:
            const {username, userId, role, token} = payload;
            saveStorage('userInfo',{username, userId, role, token});
            return {...state, username, userId, role}
case TYPES.USER_LOGIN_OUT:
    removeStorage('userInfo');
    return {...state, username: '', userId: 0, role: 2}
    default:
        return state
    }
}

export default UserReducer