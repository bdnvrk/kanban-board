import uniqueId from 'lodash/fp/uniqueId';
import findIndex from 'lodash/fp/findIndex';
import { ADD_NEW_LIST, ADD_NEW_TASK, EDIT_LIST } from '../../actions/types';

const initialId = uniqueId('list_');

const initialState = [
  {
    id: initialId,
    name: 'Twoja pierwsza lista',
    tasks: [],
  },
];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_LIST: {
      const { name } = action.payload;
      const id = uniqueId('list_');

      return [
        ...state,
        {
          id: id,
          name: name,
          tasks: [],
        },
      ];
    }
    case EDIT_LIST: {
      const { id, listData: { name, order: newOrder } } = action.payload;
    
      const target = parseInt(newOrder, 10) - 1;
      const index = findIndex(list => list.id === id)(state);
      const listData = state[index];

      const updatedList = {
        ...listData,
        name: name,
      };
    
      const filteredLists = state.filter(list => list.id !== id);
      const lists = filteredLists.slice();
      lists.splice(target, 0, updatedList);

      return lists;
    }
    case ADD_NEW_TASK: {
      const { listId, taskId } = action.payload;
      const index = findIndex(list => list.id === listId)(state);
      const listData = state[index];

      const updatedState = state.slice();
      updatedState[index] = {
        ...listData,
        tasks: [...listData.tasks, taskId],
      };

      return updatedState;
    }
    default:
      return state
  }
};
