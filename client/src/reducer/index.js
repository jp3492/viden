import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import AuthReducer from './AuthReducer';
import FileReducer from './FileReducer';
import NameReducer from './NameReducer';
import ScoutsReducer from './ScoutsReducer';
import SelectedGameReducer from './SelectedGameReducer';
import FilteredStatsReducer from './FilteredStatsReducer';
import FilterReducer from './FilterReducer';

export default combineReducers({
  auth: AuthReducer,
  file: FileReducer,
  name: NameReducer,
  scouts: ScoutsReducer,
  selectedGame: SelectedGameReducer,
  filter: FilterReducer,
  filteredStats: FilteredStatsReducer,
  form: FormReducer
});
