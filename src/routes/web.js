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
  } ]
}
export default Web