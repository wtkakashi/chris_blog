import React, {useState} from 'react'
import { useMediaQuery } from 'react-responsive'
import {Link} from 'react-router-dom'
import {MenuOutlined} from '@ant-design/icons'
import {Divider, Drawer} from 'antd'
const title = '快速导航'

const List = props => {
    const {list, showTitle = true} = props;
    return(
        <ul className='preview'>
            {showTitle && <Divider>{title}</Divider>}
            {list.map(v => {
                return (
                    <li key={v.id}>
                        <Link to={`/article/${v.id}`}>{v.title}</Link>
                    </li>
                )
            })}
        </ul>
    )
}

const QuickLink = props => {
    const isGreaterThan1300 = useMediaQuery({query: '(min-width: 1300px)'});
    const [drawerVisible, setDrawerVisible] = useState(false)
    const {list} = props;
    return isGreaterThan1300 ? <List list={list} /> : (
        <div className='quick-link'>
            <div className='drawer-btn' onClick={e => {setDrawerVisible(true)}}>
            <MenuOutlined style={{width: '45px'}}/>
            </div>
            <Drawer
            title={title}
            placement='right'
            onClose={e => setDrawerVisible(false)}
            visible={drawerVisible}
            getContainer={()=>document.querySelector('.app-home')}>
                <List list={list} showTitle={false}></List>
                </Drawer>
        </div>
    )
}
export default QuickLink