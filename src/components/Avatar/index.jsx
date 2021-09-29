import React from 'react'
import { DISCUSS_AVATAR } from '@/config'
import { Avatar } from 'antd';

const AppAvatar = props => {
    let avatarSrc = '';
    const {role, username} = props.userInfo;
    if(role === 1) avatarSrc = DISCUSS_AVATAR;
    return (
        <Avatar src={avatarSrc}>{username}</Avatar>
    )
}
export default AppAvatar