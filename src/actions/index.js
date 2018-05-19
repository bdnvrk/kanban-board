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

export const removeListWithTasks = (listId, tasks) => {
  return dispatch => {
    dispatch(removeList(listId));
    dispatch(removeTasks(tasks));
    dispatch(updateDatabase());
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

const saveDataFromDatabase = () => ({
  type: types.SAVE_DATA_FROM_DATABASE,
});
const savedDataFromDatabase = (data) => ({
  type: types.SAVED_DATA_FROM_DATABASE,
  data
})

const saveDataToDatabase = () => ({
  type: types.SAVE_DATA_TO_DATABASE
});

const savedDataToDatabase = () => ({
  type: types.SAVED_DATA_TO_DATABASE
});

export const updateDatabase = () => {
  return (dispatch, getState) => {
    const { lists, tasks } = getState();
    const data = {
      '/lists/': lists,
      '/tasks/': tasks 
    };
    dispatch(saveDataToDatabase());
    return database.ref().update(data).then((status) => {
      dispatch(savedDataToDatabase())
    });
  }
  /**TODO zapisywanie danych zgodnie z ustalona hierarchia w storze */
}


export const getDataFromDb = () => {
  return dispatch => {
    dispatch(saveDataToDatabase());
    return database.ref('/').once('value').then((snapshot) => {
      console.log(snapshot)
      dispatch(savedDataFromDatabase(snapshot));
    });
  }
}

export const combineAddTask = (listId, taskId, taskData) => {
  return dispatch => {
    dispatch(addNewTask(listId, taskId, taskData));
    dispatch(updateDatabase());
  }
}
const removeList = id => ({
  type: types.REMOVE_LIST,
  payload: { id },
});

const removeTasks = tasks => ({
  type: types.REMOVE_TASKS,
  payload: { tasks },
});

const removeSingleTask = (taskId, listId) => ({
  type: types.REMOVE_SINGLE_TASK,
  payload: { taskId, listId },
});

export const combineRemoveSingleTask = (taskId, listId) => {
  return dispatch => {
    dispatch(removeSingleTask(taskId, listId));
    dispatch(updateDatabase());
  }
}
