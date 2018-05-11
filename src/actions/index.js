import * as types from './types';
import * as firebase from 'firebase';
import { provider } from '../helperFunctions/client';

export const addNewList = (name) => ({
  type: types.ADD_NEW_LIST,
  payload: { name },
});

export const authorizeUser = (userData) => ({
  type: types.AUTHORIZE_USER,
  userData
});

export const logOut = () => ({
  type: types.LOG_OUT,
})

export const promptError = (error) => ({
  type: types.PROMPT_ERROR,
  error
})

const requestAuthorization = () => ({
  type: types.REQUEST_AUTHORIZATION
})

export const startAuthorization = () => {
  return dispatch => {
    dispatch(requestAuthorization());
    return firebase.auth().signInWithPopup(provider)
      .then((res) => {
        dispatch(authorizeUser(res.user));
      }).catch((err) => {
        dispatch(promptError(err.code))
      });
  }
}

export const requestLogout = () => {
  return dispatch => {
    return firebase.auth().signOut() 
      .then(() => {
        dispatch(logOut());
      }).catch((err) => {
        dispatch(promptError(err.code))
      });
  }
}

export const removeListWithTasks = (listId, tasks) => {
  return dispatch => {
    dispatch(removeList(listId));
    dispatch(removeTasks(tasks));
  }
};

export const addNewTask = (listId, taskId, taskData) => ({
  type: types.ADD_NEW_TASK,
  payload: { listId, taskId, taskData },
});

export const editList = (id, listData) => ({
  type: types.EDIT_LIST,
  payload: { id, listData },
});

const removeList = id => ({
  type: types.REMOVE_LIST,
  payload: { id },
});

const removeTasks = tasks => ({
  type: types.REMOVE_TASKS,
  payload: { tasks },
});
