import React,{useState} from 'react';
import {Dropdown, Menu,Input} from 'antd';
import { Link } from 'react-router-dom';
import {MenuOutlined,HomeOutlined,TagsOutlined,FieldTimeOutlined,UserOutlined,SearchOutlined} from '@ant-design/icons';
import {HEADER_BLOG_NAME} from '@/config.js'
import { useHistory } from 'react-router-dom';

import navList from '../right/navList';


const HeaderLeft = () =>{
  const [keyword, setKeyword] = useState('');
  const history = useHistory();
  
  function handleChange(e) {
    e.preventDefault()
    setKeyword(e.target.value)
  }

  function onPressEnter(e) {
    e.target.blur()
  }

  function onSubmit() {
    history.push(`/?page=1&keyword=${keyword}`)
    setKeyword('')
  }

  function clickSearch(e) {
    e.stopPropagation()
  }

  const menu = (
    <Menu className='header-nav'>
      {
        navList.map(nav => (
          <Menu.Item key={nav.link}>
            <Link to={nav.link}>
            {nav.icon === 'HomeOutlined' &&  <HomeOutlined style={{ marginRight: 15 }} />}
         {nav.icon === 'TagsOutlined' &&  <TagsOutlined style={{ marginRight: 15 }} />}
         {nav.icon === 'FieldTimeOutlined' &&  <FieldTimeOutlined style={{ marginRight: 15 }} />}
         {nav.icon === 'UserOutlined' &&  <UserOutlined style={{ marginRight: 15 }} />}
              <span className='nav-text'>{nav.title}</span>
            </Link>
          </Menu.Item>
        ))
      }
      <Menu.Item key={'search'}>
      <SearchOutlined className='search-icon'/>
        <Input
          type='text'
          value={keyword}
          onClick={clickSearch}
          onChange={handleChange}
          onPressEnter={onPressEnter}
          onBlur={onSubmit}
          className='search-input'
          placeholder='搜索文章'
          bordered={false}
          style={{ width: 200 }}
        />
      </Menu.Item>
    </Menu>
  )
  return (
    <div className='header-left'>
      <span className='blog-name'>{HEADER_BLOG_NAME}</span>
      <Dropdown
      overlayClassName='header-dropdown'
      trigger={['click']}
      overlay={menu}
      getPopupContainer={()=>document.querySelector('.app-header .header-left')}>
      <MenuOutlined className='header-dropdown-icon'/>
      </Dropdown>
    </div>
  )
}
export default HeaderLeft

