import Layout from '../layout/admin'
import Loadable from 'react-loadable';
import LoadingComponent from '../components/loadingComponent/loadingComponent'
const loadConfig = {
  loading: LoadingComponent,
  delay: 300
}

const Admin =  {
  path: '/admin',
  name: 'adminHome',
  component: Layout,
  childRoutes: [
    {path: '/adminHome', component: Loadable({
      loader:()=>import('../views/admin/home'),
      loading: LoadingComponent,
      delay: 300})}
  ]
}
export default Admin