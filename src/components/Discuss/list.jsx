import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import axios from "@/utils/axios";
import { translateMarkdown } from "@/utils";
import dayjs from "dayjs";
import AppAvatar from "@/components/Avatar";
import {DeleteOutlined} from '@ant-design/icons'
import {
  Comment,
  Button,
  Tooltip,
  Input,
  Icon,
  Popconfirm,
  message,
} from "antd";
import { API_BAISC_URL } from "../../config";
const { TextArea } = Input;

const CommentItem = props=>{
    const {children, item, userInfo, articleId, commentId, replyId, replyVisible} = props;
    const {user} = item;
    const [value, setValue] = useState('');

    useEffect(()=>{
        replyVisible && setValue('')
    },[replyVisible])

    function handleReply(){
        props.onReply({commentId, replyId})
    } 
    const onDelete = () =>{
        //TODO删除留言逻辑
    }
    function handleChange(e) {
        setValue(e.target.value);
    }
    function handleKeyUp(e) {
        if(e.ctrlKey && e.keyCode === 13) {
            onSubmit()
        }
    }
    function onSubmit(){
        if(!userInfo.userId) return message.warn('您未登录，请登录后尝试')
        //TODO add留言功能
        axios.post(`${API_BAISC_URL}/log/discuss`,{
            userId: userInfo.userId,
            articleId,
            content: value.trim(),
            commentId
        }).then(res =>{
            props.onReply({commentId: 0, replyId: 0});
            props.setCommentList(res.rows)
        })
    }

    return (
        <Comment
        actions={[
            <span onClick={handleReply}>Reply to</span>,
            <>
            {userInfo.role === 1 && (
                <Popconfirm title={'是否删除该留言？'} cancelText='取消' okText='确认' onConfirm={onDelete}>
                    <DeleteOutlined />
                </Popconfirm>
            )}
            </>
        ]
        }
        author={<span>{user && user.username}</span>}
        avatar={<AppAvatar userInfo={user}></AppAvatar>}
        content={
            <div className='article-detail' dangerouslySetInnerHTML={{__html: translateMarkdown(item.content, true)}} />
        }
        datetime={
            <Tooltip title={item.createdAt}>
                {/* <span>{dayjs(item.createdAt).fromNow()}</span> */}
            </Tooltip>
        }>
            {replyVisible && (
                <div className='reply-form'>
                    <TextArea
                    placeholder={`回复${item.user.username}`}
                    value={value}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}></TextArea>
                    <div className='reply-form-controls'>
                        <Button type='primary' disabled={!value.trim()} onClick={onSubmit}>
                            回复
                        </Button>
                    </div>
                </div>
            )}
        </Comment>

    )

}
const CommentList = (props) => {
  const userInfo = useSelector((state) => state.user);
  const {commentList, articleId} = props;
  //replyTarget当前回复的人的commentId和replyId
  const [replyTarget, setReplyTarget] = useState({ commentId: 0, replyId: 0 });
  return <div className="discuss-list">
      {commentList.map(list => (
          <CommentItem
          item={list}
          key={list.id}
          articleId={articleId}
          userInfo={userInfo}
          commentId={list.id}
          setCommentList = {props.setCommentList}
          commentList = {commentList}
          onReply={setReplyTarget}
          replyVisible={replyTarget.commentId === list.id && !replyTarget.replyId}
          >
              {list.replies.map(reply => (
            <CommentItem
              item={reply}
              key={reply.id}
              articleId={articleId}
              userInfo={userInfo}
              commentId={list.id}
              replyId={reply.id}
              setCommentList={props.setCommentList}
              commentList={commentList}
              onReply={setReplyTarget} 
              replyVisible={replyTarget.commentId === list.id && replyTarget.replyId === reply.id}  //list.id是当前这条评论的id
            />
          ))}
          </CommentItem>
      ))}
  </div>;
};
export default CommentList;
