import React from 'react';
import {Layout, Row, Col} from 'antd'
import Left from './left'
import Right from './right'

const Header = Layout.Header;

// 响应式
const responsiveLeft = { xxl: 4, xl: 5, lg: 5, sm: 4, xs: 24 }
const responsiveRight = { xxl: 20, xl: 19, lg: 19, sm: 20, xs: 0 }

const WebHeader = () => {
  return (
    <Header className='app-header'>
      <Row>
        <Col {...responsiveLeft}>
          <Left></Left>
        </Col>
        <Col {...responsiveRight}>
          <Right></Right>
        </Col>
      </Row>
    </Header>
  )
}
export default WebHeader