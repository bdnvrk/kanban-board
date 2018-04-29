import { combineReducers } from 'redux';
import lists from './lists';
import authorization from './authorization';

export default combineReducers({
  authorization, lists
});