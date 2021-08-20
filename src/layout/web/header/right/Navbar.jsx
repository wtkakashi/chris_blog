import React from 'react';
import {Link, useLocation } from 'react-router-dom'
import {Menu} from 'antd'
import {HomeOutlined,EditOutlined,FolderOutlined,UserOutlined} from '@ant-design/icons';

import navList from './navList'

const Navbar = props =>{
  const location = useLocation(); 
  const {mode = 'horizontal'} = props;

  return (
    <Menu mode={mode} selectedKeys={[location.pathname]} className='header-nav'>
    {navList.map(nav => {
      return (
        <Menu.Item key={nav.link}>
        <Link to={nav.link}>
       {nav.icon === 'HomeOutlined' &&  <HomeOutlined  />}
       {nav.icon === 'EditOutlined' &&  <EditOutlined  />}
       {nav.icon === 'FolderOutlined' &&  <FolderOutlined  />}
       {nav.icon === 'UserOutlined' &&  <UserOutlined  />}
        <span className='nav-text'>{nav.title}</span>
        </Link>
        </Menu.Item>
      )
    })}
    </Menu>
  )
}
export default Navbar