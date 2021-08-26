import { combineReducers } from "redux";
import articles from './articles/reducer'
import user from './user/reducer'
 export default combineReducers({
    articles,
    user
 })