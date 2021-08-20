import React, {useState}from 'react';
import {Input} from 'antd'
import {SearchOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
const Search = props =>{
  const history = useHistory();
  const [keyword, setKeyword] = useState('');
  const handleChange = e =>{
    setKeyword(e.target.value);
  }
  const handleSubmit = e =>{
    if(keyword) {
      //TODO add page
       history.push(`/?page=1keyword=${keyword}`)
      console.log(keyword);
    }
  }
  
  return (
    <div className='search-box'>
      <SearchOutlined className='search-icon' onClick={e =>{props.history.push(`/?page=1&keyword={keyword}`)}}/>
      <Input
        type='text'
        value={keyword}
        onChange={handleChange}
        onBlur={handleSubmit}
        onPressEnter={handleSubmit}
        className='search-input'
        placeholder='搜索文章'
        bordered={false}
        style={{ width: 200 }}
      />
    </div>
  )
}
export default Search