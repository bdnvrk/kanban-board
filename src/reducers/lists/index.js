import uniqueId from 'lodash/fp/uniqueId';
import { ADD_NEW_LIST, ADD_NEW_TASK } from '../../actions/types';

const initialId = uniqueId('list_');

const initialState = {
  [initialId]: {
    id: initialId,
    name: 'Twoja pierwsza lista',
    order: 0,
    tasks: [],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_LIST: {
      const { name } = action.payload;
      const id = uniqueId('list_');

      return {
        ...state,
        [id]: {
          id,
          name,
          order: state.length,
          tasks: [],
        },
      };
    }
    case ADD_NEW_TASK: {
      const { listId, taskId } = action.payload;
      const listData = state[listId];

      return {
        ...state,
        [listId]: {
          ...listData,
          tasks: [...listData.tasks, taskId],
        },
      };
    }
    default:
      return state
  }
}