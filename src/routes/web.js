/*
 * @Author: your name
 * @Date: 2021-08-23 09:49:58
 * @LastEditTime: 2021-09-24 14:25:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /chris_blog/src/routes/web.js
 */
import Layout from '../layout/web'
import LoadingComponent from '../components/loadingComponent/loadingComponent'
import Loadable from 'react-loadable'

const Web = {
  path: '/',
  name: 'home',
  component: Layout,
  childRoutes: [{
    path: '', 
    component: Loadable({
      loader: ()=>import('../views/web/home'),
      loading: LoadingComponent,
      delay: 300
    })
  },{
    path: 'article/:id', 
    component: Loadable({
      loader: ()=>import('../views/web/article'),
      loading: LoadingComponent,
      delay: 300
    })
  },{
    path: 'archives', 
    component: Loadable({
      loader: ()=>import('../views/web/archives'),
      loading: LoadingComponent,
      delay: 300
    })
  },{
    path: 'categories', 
    component: Loadable({
      loader: ()=>import('../views/web/categories'),
      loading: LoadingComponent,
      delay: 300
    })
  },{
    path: 'categories/:name', 
    component: Loadable({
      loader: ()=>import('../views/web/tag'),
      loading: LoadingComponent,
      delay: 300
    })
  },{
    path: 'tags/:name', 
    component: Loadable({
      loader: ()=>import('../views/web/tag'),
      loading: LoadingComponent,
      delay: 300
    })
  }]
}
export default Web