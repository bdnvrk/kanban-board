import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import lists from './lists';
import authorization from './authorization';
import tasks from './tasks';
import databaseConnection from './databaseConnection';

export default combineReducers({
  authorization,
  lists,
  tasks,
  form: formReducer,
  databaseConnection
});
