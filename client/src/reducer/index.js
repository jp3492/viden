import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import ControlsReducer from './ControlsReducer';
import HighlightsReducer from './HighlightsReducer';
import CreateReducer from './CreateReducer';
import SearchReducer from './SearchReducer';

export default combineReducers({
  auth: AuthReducer,
  controls: ControlsReducer,
  highlights: HighlightsReducer,
  create: CreateReducer,
  search: SearchReducer
});
