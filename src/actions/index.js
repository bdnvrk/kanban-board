import * as types from './types';

export const addNewList = (name) => ({
  type: types.ADD_NEW_LIST,
  payload: { name },
});