import React from 'react';
import { SIDEBAR } from '@/config'
import { Divider } from 'antd';
import {useSelector} from 'react-redux'

const SideBar = ()=>{
  return (
    <aside className='app-sidebar'>
    <img src='' />
    <h2>{SIDEBAR.title}</h2>
    <h5 className='font-gray'>{SIDEBAR.subTitle}</h5>
    <Divider orientation="left">标签</Divider>
    </aside>
  )
}
export default SideBar