import React from 'react';
import {Button } from 'antd'
const UserInfo = props =>{
  return (
    <div className='header-userInfo'>
      <Button
      ghost
              type='primary'
              size='small'
              style={{ marginRight: 20 }}
              className='btn-radius-4'
               >
              登录
            </Button>
            <Button ghost type='danger' className='btn-radius-4' size='small'>
              注册
            </Button>
    </div>
  )
}
export default UserInfo