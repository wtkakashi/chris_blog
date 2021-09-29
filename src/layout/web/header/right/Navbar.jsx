import React from 'react';
import {Link, useLocation } from 'react-router-dom'
import {Menu} from 'antd'
import {HomeOutlined,TagsOutlined,FieldTimeOutlined,UserOutlined} from '@ant-design/icons';

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
       {nav.icon === 'TagsOutlined' &&  <TagsOutlined  />}
       {nav.icon === 'FieldTimeOutlined' &&  <FieldTimeOutlined  />}
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