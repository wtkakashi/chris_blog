/*
 * @Author: your name
 * @Date: 2021-08-23 09:49:58
 * @LastEditTime: 2021-09-28 15:07:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /chris_blog/src/store/articles/actions.js
 */
import * as TYPES from '../types'
import axios from '@/utils/axios'

export const getTagList = ()=> dispatch => 
axios.get('/log/tag/list').then(res =>{
    dispatch({
        type: TYPES.ARTICLE_GET_TAG_LIST,
        payload: res.data
    })
})
export const getCategoryList = () => dispatch =>
axios.get('/log/category/list').then(res => {
    dispatch({
        type: TYPES.ARTICLE_GET_CATEGORY_LIST,
        payload: res
    })
})
