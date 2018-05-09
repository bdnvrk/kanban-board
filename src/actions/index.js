import * as types from './types';
import * as firebase from 'firebase';
import { provider } from '../helperFunctions/client';

const database = firebase.database();

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
export const addNewTask = (listId, taskId, taskData) => ({
  type: types.ADD_NEW_TASK,
  payload: { listId, taskId, taskData },
});

export const editList = (id, listData) => ({
  type: types.EDIT_LIST,
  payload: { id, listData },
});

export const updateDatabase = (path, data) => {
  const updateData = {
    [path]: data
  }

  return firebase.database().ref().update(updateData);
}

export const getDataFromDb = () => {
  return firebase.database().ref('/lists').once('value').then((snapshot) => {
    return snapshot.val() && snapshot.val().username
  });
}

export const removeFromDb = (path) => {

}