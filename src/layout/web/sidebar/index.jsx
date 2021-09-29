import React from 'react';
import { SIDEBAR } from '@/config'
import { Divider ,Tag} from 'antd';
import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { getTagList } from '@/store/articles/actions'

const SideBar = ()=>{
  const dispatch = useDispatch();
  const tagList = useSelector(state => {
    console.log(state);
    return state.article.tagList
  });
  useEffect(() => {
    console.log('useEfflct');
    dispatch(getTagList()) // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <aside className='app-sidebar'>
    <img src={SIDEBAR.avatar} alt='' className='sider-avatar'/>
    <h2>{SIDEBAR.title}</h2>
    <h5 className='font-gray'>{SIDEBAR.subTitle}</h5>
    <Divider orientation="left">标签</Divider>
    {tagList.map((tag, idx)=>{
      return (
        <Tag key={idx} color={tag.color} className='tag-item'>
          <Link to={`/tags/${tag.name}`}>{tag.name}</Link>
        </Tag>
      )
    })}
    </aside>
  )
}
export default SideBar