import React, {useMemo} from 'react'
import {Spin, Empty} from 'antd'
import useFetchList from '@/hooks/useFetchList'
import {HOME_PAGESIZE} from '@/utils/config'
import { decodeQuery, translateMarkdown } from '../../../utils'
import './index.less'

import QuickLink from './QuickLink'
import ArticleList from './List'
const Home = props=>{
    const {loading, pagination, dataList} = useFetchList({
        requestUrl: `/log/article/list`, //https://www.fastmock.site/mock/a136e622ecf396cd60384ab5cc88ed86/log/article/list
        queryParams: {pageSize: HOME_PAGESIZE},
        routerParams: [props.location.search]
    })
    console.log(dataList);

    const list = useMemo(()=>{
        console.log(dataList);
        return [...dataList].map(d => {
            let wrapIdx = d.content.indexOf('\n');
            const idx = d.content.indexOf('<!--more-->') > 0 ? d.content.indexOf('<!--more-->') : d.content.indexOf('\n',wrapIdx + 2);
            d.content = translateMarkdown(`${d.content.slice(0, idx)}...`);
            return d
        })
    }, [dataList])

    const {keyword} = props.location.search ? decodeQuery(props.location.search):'';


    return (
        <Spin tip='loading...' spinning={loading} className='height100'>
            <div className='app-home height100'>
                <ArticleList list={list} pagination={pagination}></ArticleList>
                <QuickLink list={list}></QuickLink>
                {list.length === 0 && keyword && (
                    <div className='no-data'>
                        <Empty description={(
                            <span>不存在标题/内容中含有<span className='keyword'>{keyword}</span>的文章</span>
                        )}></Empty>
                    </div>
                )}
                
            </div>
        </Spin>
    )
}
export default Home