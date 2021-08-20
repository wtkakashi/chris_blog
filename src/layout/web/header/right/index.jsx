import React from 'react';
import Search from './Search';
import UserInfo from './UserInfo';
import Navbar from './Navbar';

const HeaderRight = ()=> {
  return (
    <div className='header-right'>
      <Search></Search>
      <Navbar></Navbar>
      <UserInfo></UserInfo>
    </div>
  )
}
export default HeaderRight