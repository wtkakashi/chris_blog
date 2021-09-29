import React from 'react'
import {Divider} from 'antd'
import {MessageOutlined, EyeOutlined} from '@ant-design/icons'
import { useHistory } from 'react-router-dom';
import WebPagination from '@/components/Pagination'
import ArticleTag from '../../../components/ArticleTag'

const List = props => {
    const {list, pagination} = props;
    console.log(list);
    const history = useHistory();
    const jumpTo = id => {
        history.push(`/article/${id}`);
    }

    return (
        <ul className='app-home-list'>
            {list.map(v => {
                return (
                    <li key={v.id} className='app-home-list-item'>
                    <Divider orientation='left'>
                        <span onClick={() => {jumpTo(v.id)}} className='title'>
                            {v.title}
                        </span>
                        <span className='posted-time'>{v.createdAt.slice(0,10)}</span>
                    </Divider>

                    <div
                    onClick={()=>jumpTo(v.id)}
                    className='article-detail content'
                    dangerouslySetInnerHTML={{ __html: v.content }}
                    />
                        <div className='list-item-others'>
                            {/* TODO add Comment */}
                            <MessageOutlined/><span style={{marginRight: 6}}>111</span>
                            <EyeOutlined /> <span>111</span>
                            <ArticleTag tagList={v.tags} categoryList = {v.categories} />
                        </div>

                     
                </li>
                )
            }
            )}
            <WebPagination
                {...pagination}
                onChange = {
                    page => {
                        document.querySelector('.app-main').scrollTop = 0;
                        pagination.onChange(page)
                    }
                }

                ></WebPagination>
        </ul>
    )
}
export default List