import React from 'react';
import routeConfig from './routes'
import { BrowserRouter as Router, Route ,Switch} from 'react-router-dom'
//import { Router, Route, Link } from 'react-router'
import Layout from './layout/web'
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
  return (
    <Router children={createRoute(routeConfig)}></Router>
  )
}
export default App
