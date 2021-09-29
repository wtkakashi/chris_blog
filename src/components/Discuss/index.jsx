import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DownOutlined ,GithubOutlined ,ExclamationCircleOutlined} from "@ant-design/icons";
import {Avatar} from 'antd'
import { loginout } from '@/store/user/actions'
import axios from "@/utils/axios";
import { calcCommentsCount } from "@/utils";
import useBus from '@/hooks/useBus'
import useAjaxLoading from "@/hooks/useAjaxLoading";
import AppAvatar from '@/components/Avatar'
import {API_BAISC_URL} from '@/config'
import List from './list' // 评论列表


import {
  Comment,
  Button,
  Divider,
  Input,
  Menu,
  Dropdown,
  message
} from "antd";

const {TextArea} = Input;

const Editor = ({onChange, onSubmit, loading, value, articleId}) => (
    <div>
        <TextArea rows={4} placeholder='say something...' onChange={onChange} value={value}></TextArea>
        <div className='controls'>
        <ExclamationCircleOutlined />
        <span className='contros-tip'>支持 Markdown 语法</span>
        <Button type="primary" className='discuss-btn' htmlType='submit' loading={loading} onClick={onSubmit} style={{marginLeft: 12}}>
            {articleId !== -1 ? '添加评论':'留言'}
        </Button>
        </div>
    </div>
)
const Discuss = (props) => {
  const userInfo = useSelector((state) => state.user);
  const { username } = userInfo;
  const bus = useBus();
  const [value, setValue] = useState('');
  const [loading, withLoading] = useAjaxLoading();

  const dispatch = useDispatch();
  const { articleId, commentList } = props;

  const handleSubmit = () => {
      if(!value) return;
      if(!userInfo.username) return message.warn('您未登录，请登录后重试')
      withLoading(
          axios.post('/log/discuss',{ articleId: props.articleId, content: value, userId: userInfo.userId}).then(res =>{
              setValue('');
              props.setCommentList(res.rows);
          })
      )
  }
  const renderDropdownMenu = () => {
    return username ? (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="loginout">注销</Menu.Item>
      </Menu>
    ) : (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="login">登录</Menu.Item>
        <Menu.Item key="register">注册</Menu.Item>
      </Menu>
    );
  };
  const handleMenuClick = (e) => {
    switch (e.key) {
      case "login":
        bus.emit("openSignModal", "login");
        break;
      case "register":
        bus.emit("openSignModal", "register");
        break;
      case "loginout":
        dispatch(loginout());
        break;
      default:
        break;
    }
  };
  return (
    <div id="discuss">
      <div className="discuss-header">
        <span className="discuss-count">{calcCommentsCount(commentList)}</span>
        {articleId !== -1 ? "条评论" : "条留言"}
        <span className="discuss-user">
          <Dropdown overlay={renderDropdownMenu()} trigger={["click", "hover"]}>
            <span>
              {username || "未登录用户"} <DownOutlined />
            </span>
          </Dropdown>
        </span>
        <Divider className="hr"></Divider>
      </div>
      <Comment 
      avatar={
          username ? (
              <AppAvatar userInfo={userInfo}></AppAvatar>
          ):(
            <Avatar icon={<GithubOutlined />} />
          )}
          content={
              <Editor 
              onChange={e=>setValue(e.target.value)}
              onSubmit={handleSubmit}
              loading={loading}
              value={value}
              articleId={articleId} />
          }></Comment>
          <List commentList={commentList} articleId={articleId} setCommentList={props.setCommentList}></List>
    </div>
  );
};
export default Discuss;
