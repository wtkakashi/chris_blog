import thunk from 'redux-thunk'
import {compose, createStore, applyMiddleware} from 'redux'
import rootReducer from './rootReducers'
import {composeWithDevTools} from 'redux-devtools-extension'

const storeEnhancers = process.env.NODE_ENV === 'production' ? compose(applyMiddleware(thunk)) : compose(composeWithDevTools(applyMiddleware(thunk)));

const configureStore = (initialState = {})=>{
  const store = createStore(rootReducer, initialState, storeEnhancers);
  if(module.hot && process.env.NODE_ENV !== 'production'){
    module.hot.accept('./rootReducers',()=>{
      console.log('Webpack hot module replacement for reducers');
      const nextRootReducer = require('./rootReducers').default;
      store.replaceReducer(nextRootReducer);
    })
  }
  return store
}

export default configureStore()