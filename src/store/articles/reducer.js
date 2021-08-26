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