import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';

export default combineReducers({
  // Your Reducers here
  auth: AuthReducer
});
