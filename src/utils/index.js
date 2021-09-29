/*
 * @Author: chris
 * @Date: 2021-08-23 09:49:58
 * @LastEditTime: 2021-09-24 11:16:19
 * @Description: common methods
 * @FilePath: /chris_blog/src/utils/index.js
 */
import {getStorage} from '@/utils/storage'
import {COLOR_LIST} from '@/utils/config'
import xss from 'xss';
import marked from 'marked';
import hljs from 'highlight.js/lib/core';


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

//获取url query参数,转换为对象,'?id=1' => params[id] =1
export const decodeQuery = url => {
  const params = {}
  const paramsStr = url.replace(/\.*\?/, '');
  paramsStr.split('&').forEach(v => {
    const d = v.split('=');
    if(d[1] && d[0]) params[d[0]] = d[1];
  })
  return params;
}

//md转换为html
export const translateMarkdown = (plainText, isGuardXss = false) => {
  return marked(isGuardXss ? xss(plainText): plainText, {
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: true,
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
  })
}

//计算评论数
export const calcCommentsCount = commentList =>{
  let count = commentList.length;
  commentList.forEach(v =>{
    count += v.replies.length;
  })
  return count 
}

//按年份分组
export const groupBy = (arr, f) => {
  const groups = {}
  arr.forEach(item => {
    const group = JSON.stringify(f(item))
    groups[group] = groups[group] || []
    groups[group].push(item)
  })
  return Object.keys(groups).map(group => groups[group])
}
export const groupBy1 = (arr, time) => {
  let year =arr.map(d => d.createdAt.slice(0,4));
 let uniqueYear = Array.from(new Set(year));
 let val = [];
 let returnVal = {}
 uniqueYear.forEach(d => {
   arr.forEach(y => {
     if(d === y.createdAt.slice(0,4)) {
       val.push(y)
     }
   })
   returnVal[d] = val;

 })
 console.log(val)
}