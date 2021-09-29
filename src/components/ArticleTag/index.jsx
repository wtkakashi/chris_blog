import React from 'react'
import { Divider, Tag } from 'antd';
import { useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { FolderOutlined, TagOutlined } from '@ant-design/icons';

const getColor = (name, colorList) =>{
    let val = colorList.find(d => d.name === name);
    return val ? val.color : ''
}
const ArticleTag = props => {
    const tagColorList = useSelector(state => state.article.tagList);
    const {tagList, categoryList} = props;
    console.log(tagList);
    return (
        <>
            {
                tagList.length && (
                    <>
                        <Divider type='vertical' style={{marginRight: 7}} />
                        <TagOutlined style={{marginRight: 7}} />
                        {tagList.map((tag, idx) => {
                        return (
                            <Tag key={idx} color={getColor(tag.name, tagColorList)}>
                                <Link to={`/tags/${tag.name}`}>{tag.name}</Link>
                            </Tag>
                        )    
                        })
                        }
                    </>
                )
            }
            {
                categoryList.length && (
                    <>
                        <Divider type='vertical' style={{ marginRight: 7 }} />
                        <FolderOutlined style={{ marginRight: 7 }}  />
                        {categoryList.map((cate, i) => (
            <Tag key={i} color='#2db7f5'>
              <Link to={`/categories/${cate.name}`}>{cate.name}</Link>
            </Tag>
          ))}
                    </>
                )
            }
        </>
    )
}
export default withRouter(ArticleTag)