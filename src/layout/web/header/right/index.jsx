import { Header } from "antd/lib/layout/layout"

import React from 'react';
import Search from './Search';
import UserInfo from './UserInfo';
import Navbar from './Navbar';

const HeaderRight = ()=> {
  return (
    <div className='header-right'>
      <Search></Search>
      <UserInfo></UserInfo>
      <Navbar></Navbar>
    </div>
  )
}
export default HeaderRight