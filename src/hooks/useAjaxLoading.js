/*
 * @Author: your name
 * @Date: 2021-09-07 16:59:04
 * @LastEditTime: 2021-09-15 16:02:58
 * @LastEditors: Please set LastEditors
 * @Description: Ajax request with loading
 * @FilePath: /chris_blog/src/hooks/useAjaxLoading.js
 */

import { useState } from 'react';
const useRequestLoading = ()=>{
    const [loading, setLoading] = useState(false);
    const withLoading = request => {
        if(request instanceof Promise) {
            return new Promise((resolve, reject) => {
                setLoading(true);
                request.then(res =>{
                    resolve(res);
                    setLoading(false);
                }).catch(err =>{
                    reject(err);
                    setLoading(false);
                })
            })
        }
    }
        return [loading, withLoading]
}
export default useRequestLoading