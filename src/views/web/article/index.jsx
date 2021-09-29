import React, { useState, useEffect } from "react";
import "./index.less";
import axios from "@/utils/axios";
import useAjaxLoading from "@/hooks/useAjaxLoading";
import { Spin ,Divider,Drawer} from "antd";
import {MenuOutlined,FieldTimeOutlined,EyeOutlined,MessageOutlined} from '@ant-design/icons';
import { useMediaQuery } from "react-responsive";
import ArticleTag from "../../../components/ArticleTag";
import {translateMarkdown, calcCommentsCount} from '@/utils'
import Navigation from './Navigation'
import Discuss from '@/components/Discuss'
import {API_BAISC_URL} from '@/config'

const Article = (props) => {
  const [loading, withLoading] = useAjaxLoading();
  const [article, setArticle] = useState({
    title: "",
    content: "",
    tags: [],
    categories: [],
    comments: [],
    createdAt: "",
    viewCount: 0,
  });
  const { title, content, tags, categories, comments, createdAt, viewCount } =article;
  const articleId = parseInt(props.match.params.id)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const isLessThan1300 = useMediaQuery({ query: "(max-width: 1300px)" });
  
  useEffect(()=>{
      withLoading(axios.get(`${API_BAISC_URL}/log/article/${props.match.params.id}`)).then(res =>{
          res.content = translateMarkdown(res.content);
          setArticle(res);
      }).catch(err =>{
          props.history.push('/404');
      }) // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.match.params.id])  

  function setCommentList(list) {
      setArticle({...article, comments: list});
  }

  return (
    <Spin tip="Loading..." spinning={loading}>
      <article
        className="app-article"
        style={{ paddingRight: isLessThan1300 ? 0 : 275 }}>
        <div className="past-header">
          <h1 className="post-title">{title}</h1>
          <div className="article-desc">
            <div className="post-time">
              <FieldTimeOutlined />
              <span>Posted on </span>
              <span>{createdAt.slice(0, 10)}</span>
            </div>
            <ArticleTag tagList={tags} categoryList={categories} />
            <Divider type='vertical'/>
            <a className='comment-count' href='#discuss'>
            <MessageOutlined/><span style={{marginRight: 6}}>{calcCommentsCount(comments)}</span>
            </a>
            <EyeOutlined  style={{ marginRight: 2 }}/>
            <span>{viewCount}</span>
          </div>
        </div>
        <div className='article_detail' dangerouslySetInnerHTML={{ __html: content}}></div>
        {isLessThan1300 ? (
            <>
            <div className='drawer-btn' onClick={e =>setDrawerVisible('true')}>
            <MenuOutlined style={{width: '45px'}}/>
            <Drawer
              title={title}
              placement='right'
              closable={false}
              onClose={e => setDrawerVisible(false)}
              visible={drawerVisible}
              getContainer={() => document.querySelector('.app-article')}>
              <div className='right-navigation'>
                <Navigation content={content} />
              </div>
            </Drawer>
            </div>
            </>
        ):(
            <nav className='article-navigation'>
                <Navigation content={content}></Navigation>
            </nav>
        )}
        <Discuss articleId={articleId} commentList={comments} setCommentList={setCommentList} />
      </article>
    </Spin>
  );
};
export default Article;
