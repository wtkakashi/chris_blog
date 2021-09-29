/*
 * @Author: chris
 * @Date: 2021-08-26 15:38:51
 * @LastEditTime: 2021-09-15 16:01:09
 * fetchList
 * requestUrl 请求地址
 * queryparams 请求参数
 * withLoading 是否携带loading
 * routerParams 地址参数，根据地址参数请求列表
 */
import { useState, useEffect ,useCallback} from 'react'
import axios from '@/utils/axios'
import { useLocation, useHistory } from 'react-router-dom';
import {decodeQuery} from '@/utils'

const useFetchList = ({requestUrl = '', queryParams = null, withLoading = true, routerParams=[]}) =>{
    const [loading, setLoading] = useState(false)
    const [dataList, setDataList] = useState([]);
    const [pagination, setPagination] = useState({current: 1, pageSize: 10,total: 0})
    
    const location = useLocation()
    const history = useHistory()

    useEffect(()=>{
        if(routerParams.length === 0) {
            fetchWithLoading()
        } else {
            const params = decodeQuery(location.search);
            fetchWithLoading(params)
        } // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const fetchWithLoading = params => {
        withLoading && setLoading(true);
        fetchDataList(params);
    }
    const fetchDataList = params => {
        const requestParams = {
            page: pagination.current,
            pageSize: pagination.pageSize,
            ...queryParams,
            ... params
        };
        axios.get(requestUrl, {params: requestParams}).then(res => {
            pagination.total = res.count;
            setPagination({...pagination});
            console.log(res);
            setDataList(res.data);
            withLoading && setLoading(false)
        }).catch(err => {
            console.log(err);
            withLoading && setLoading(false);
        })
    }
    const onFetch = useCallback(
        params => {
            fetchWithLoading(params);
        },[] // eslint-disable-next-line react-hooks/exhaustive-deps
    )
    
    const handlePageChange = useCallback(
        page => {
            console.log(location.search)
            const search = location.search.includes('page=')
            ? location.search.replace(/(page=)(\d+)/,`$1${page}`)
            : `?page=${page}`
            const jumpUrl = location.pathname + search;
            history.push(jumpUrl)
        },[queryParams, location.pathname]
    )
    return {
        dataList,
        loading,
        pagination: {
            ...pagination,
            onChange: handlePageChange
        },
        onFetch
    }
} 

export default useFetchList