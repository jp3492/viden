import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import ControlsReducer from './ControlsReducer';
import HighlightsReducer from './HighlightsReducer';
import CreateReducer from './CreateReducer';
import SearchReducer from './SearchReducer';
import AdminReducer from './AdminReducer';
import LoadReducer from './LoadReducer';

export default combineReducers({
  auth: AuthReducer,
  controls: ControlsReducer,
  highlights: HighlightsReducer,
  create: CreateReducer,
  search: SearchReducer,
  admin: AdminReducer,
  load: LoadReducer
});
