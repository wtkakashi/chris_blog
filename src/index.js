/*
 * @Author: your name
 * @Date: 2021-08-23 09:49:58
 * @LastEditTime: 2021-09-18 17:35:31
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /chris_blog/src/index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import '@/styles/index.less';

import App from './App';
import { Provider } from 'react-redux'
import store from './store'
import 'antd/dist/antd.css';
import {Provider as BusProvider} from '@/hooks/useBus'

ReactDOM.render(
  <BusProvider>
  <Provider store={store}>
    <App />
  </Provider>
  </BusProvider>,
  document.getElementById('root')
);
 
