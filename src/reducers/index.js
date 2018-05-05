import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import lists from './lists';
import tasks from './tasks';

export default combineReducers({
  lists,
  tasks,
  form: formReducer,
});
