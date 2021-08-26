import React from 'react';
import {HEADER_BLOG_NAME} from '@/config.js'

const HeaderLeft = () =>{
  return (
    <div className='header-left'>
      <span className='blog-name'>{HEADER_BLOG_NAME}</span>
    </div>
  )
}
export default HeaderLeft

