/*
 * @Author: your name
 * @Date: 2021-08-23 09:49:58
 * @LastEditTime: 2021-09-24 14:54:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /chris_blog/src/store/articles/reducer.js
 */
import * as TYPES from '@/store/types'
import {generatorColor} from '@/utils'

const defaultState = {
    categoryList: [],
    tagList: []
}

function articleReducer(state = defaultState, action) {
    const {type, payload} = action;
    switch (type) {
        case TYPES.ARTICLE_GET_TAG_LIST:
            const tagList = generatorColor(payload);
            console.log(state);
            return {...state,tagList}
        case TYPES.ARTICLE_GET_CATEGORY_LIST:
            const categoryList = generatorColor(payload)
            return { ...state, categoryList }
        default:
            return state
    }
}
export default articleReducer