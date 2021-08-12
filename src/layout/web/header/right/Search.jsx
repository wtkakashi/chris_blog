import React, {useState}from 'react';
import {Input} from 'antd'
import {SearchOutlined} from '@ant-design/icons';
const Search = props =>{
  const [keyword, setKeyword] = useState('');
  const handleChange = e =>{
    setKeyword(e.target.value);
  }
  const handleSubmit = e =>{
    setKeyword(e.targer.value)
  }
  
  return (
    <div id='search-box'>
      <SearchOutlined onClick={e =>{props.history.push(`/?page=1&keyword={keyword}`)}}/>
      <Input
        type='text'
        value={keyword}
        onChange={handleChange}
        onBlur={handleSubmit}
        onPressEnter={handleSubmit}
        className='search-input'
        placeholder='搜索文章'
        style={{ width: 200 }}
      />
    </div>
  )
}
export default Search