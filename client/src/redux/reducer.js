import { combineReducers } from 'redux';
import products from './reducers/products';
import authUser from './reducers/authUser';
import common from './reducers/common';
// import { routerReducer } from 'react-router-redux';

export default combineReducers({
  products,
  authUser,
  common
  // router: routerReducer
});