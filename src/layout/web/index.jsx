import React from 'react';
import '@/styles/app.less'
import {Layout, Row, Col} from 'antd'

import Header from './header'
import SideBar from './sidebar'
import AppMain from './AppMain'

// 响应式
const siderLayout = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 }
const contentLayout = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 }

const WebLayout = props=>(
   <Layout className='app-container'>
     <Header></Header>
     <Row className='app-wrapper'>
       <Col {...siderLayout}>
         <SideBar />
       </Col>
       <Col {...contentLayout}>
       <AppMain {...props}></AppMain>
       </Col>
     </Row>
   </Layout>
  )
export default WebLayout