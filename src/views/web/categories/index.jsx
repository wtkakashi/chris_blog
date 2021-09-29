import { Badge,Tag } from 'antd'
import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import './index.less'

const Categories = props =>{
    const categoryList = useSelector(state => state.article.categoryList)
    return(
        <div className='app-categories'>
            <h2 className='title'>Categories</h2>
            <p className='category-all-title'>{`${categoryList.length} categories in total`}</p>
            <div className='categories-list'>
                {categoryList.map((item, idx)=>(
                    <Badge count={item.count} key={item.name}>
                        <Tag color={item.color}>
                            <Link to={`/tags/${item.name}`}>{item.name}</Link>
                        </Tag>
                    </Badge>
                ))}
            </div>
        </div>
    )
}
export default Categories