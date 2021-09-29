/*
 * @Author: your name
 * @Date: 2021-08-23 09:49:58
 * @LastEditTime: 2021-09-23 14:19:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /chris_blog/src/App.js
 */
import React from 'react';
import routeConfig from './routes'
import PublicComponent from '@/components/Public'
import { BrowserRouter as Router, Route ,Switch} from 'react-router-dom'

function App() {
  console.log(routeConfig);
  const createRoute = routes => {
    return (
      <Switch>
        {routes.map((route, idx)=> createFixRoute(route, idx))}
      </Switch>
    )
  }
  const createFixRoute = (route, idx) =>{
    const {path, component: RouteComponent, childRoutes} = route;
    if(childRoutes) {
      return (
        <Route
      key={idx}
      path={path}
      children={props =>{
        return (
          <RouteComponent {...props}>
            <Switch>
              {childRoutes.map((child, idx2)=>{
                const {path: childPath} = child;
                return createFixRoute({...child, path:path + childPath}, `${idx}-${idx2}`)
              })}
            </Switch>
          </RouteComponent>
        )
      }}>

      </Route>
      )
    }
    else {
      return createBasicRoute(route, idx);
    }

  }
  const createBasicRoute = (route, idx) =>{
    const {path, component: Component} = route;
    console.log(route);
    return (
      <Route exact key={idx} path={path} component={Component}></Route>
    )
  }
  const children = createRoute(routeConfig);
  return (
    <Router>
      {children}
        <PublicComponent />
    </Router>
  )
}
export default App
