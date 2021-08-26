import React from 'react';
//import { useMediaQuery } from 'react-responsive';

const AppMain = props =>{
  /* const isIphoneScreen = useMediaQuery({
    query: '(max-width: 576px)'
  })
  const isIpadScreen = useMediaQuery({
    query: '(min-width: 576px) and (max-width: 992px)'
  }) */
  return (
    <div className='app-main'>
      {props.children}
    </div>
  )
}
export default AppMain