import {Spin} from 'antd'

const LoadingComponent = ({error, pastDelay}) =>{
  if(error) {
    return <div>Error</div>
  } else if(pastDelay) {
    return <Spin />
  } else {
    return null
  }
}
export default LoadingComponent



 