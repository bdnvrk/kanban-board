import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import lists from './lists';
import authorization from './authorization';
import tasks from './tasks';
import databaseConnection from './databaseConnection';
import users from './users';
import filterEnabled from './filter';
import loader from './loader';


export default combineReducers({
  authorization,
  lists,
  tasks,
  form: formReducer,
  databaseConnection,
  users,
  filterEnabled,
  loader
});
