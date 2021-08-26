import {getStorage} from '@/utils/storage'
import {COLOR_LIST} from '@/utils/config'

//获取token
export function getToken() {
  let token = '';
  const userInfo = getStorage('userInfo');
  if(userInfo && userInfo.token) {
     token = 'Bearer ' + userInfo.token;
  }
  return token;
}

//生成color
export function generatorColor(list = [], colorList = COLOR_LIST) {
  let returnVal = JSON.parse(JSON.stringify(list));
  returnVal.map((val, idx) =>{
    val.color = colorList[idx]
    return val
  })
  return returnVal
}