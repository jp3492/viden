import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import ControlsReducer from './ControlsReducer';
import MainReducer from './MainReducer';
import PlayerReducer from './PlayerReducer';

export default combineReducers({
  auth: AuthReducer,
  controls: ControlsReducer,
  main: MainReducer,
  player: PlayerReducer
});
