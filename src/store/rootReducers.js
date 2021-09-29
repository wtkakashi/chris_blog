/*
 * @Author: your name
 * @Date: 2021-08-25 10:48:15
 * @LastEditTime: 2021-09-03 11:19:06
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /chris_blog/src/store/rootReducers.js
 */
import { combineReducers } from "redux";
import article from './articles/reducer'
import user from './user/reducer'
 export default combineReducers({
    article,
    user
 })