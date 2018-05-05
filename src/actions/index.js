import * as types from './types';

export const addNewList = (name) => ({
  type: types.ADD_NEW_LIST,
  payload: { name },
});

export const addNewTask = (listId, taskId, taskData) => ({
  type: types.ADD_NEW_TASK,
  payload: { listId, taskId, taskData },
});