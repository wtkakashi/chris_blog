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
        payload: res.data
    })
})
