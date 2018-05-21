import uniqueId from 'lodash/fp/uniqueId';
import findIndex from 'lodash/fp/findIndex';
import { 
  ADD_NEW_LIST, 
  ADD_NEW_TASK, 
  EDIT_LIST, 
  REMOVE_LIST, 
  REMOVE_SINGLE_TASK,
  MOVE_TASK,
} from '../../actions/types';

const initialId = uniqueId('list_');

const initialState = [
  {
    id: initialId,
    name: 'Twoja pierwsza lista',
    tasks: ['task_0'],
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
    case REMOVE_LIST: {
      const { id } = action.payload;

      return state.filter(list => list.id !== id);
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
    case REMOVE_SINGLE_TASK: {
      const { listId, taskId } = action.payload;
      const listIndex = findIndex(list => list.id === listId)(state);
      const listData = state[listIndex];
      const tasksList = listData.tasks.slice();
      const taskIndex = tasksList.indexOf(taskId);
      tasksList.splice(taskIndex, 1);

      const updatedState = state.slice();
      updatedState[listIndex] = {
        ...listData,
        tasks: tasksList,
      };

      return updatedState;
    }
    case MOVE_TASK: {
      const { taskId, currentListId, nextListId } = action.payload;
      const currentListIndex = findIndex(list => list.id === currentListId)(state);
      const nextListIndex = findIndex(list => list.id === nextListId)(state);

      const tasksList1 = state[currentListIndex].tasks.slice();
      const taskIndex = tasksList1.indexOf(taskId);
      tasksList1.splice(taskIndex, 1);

      const tasksList2 = state[nextListIndex].tasks.concat(taskId);

      const updatedState = state.slice();
      updatedState[currentListIndex] = {
        ...state[currentListIndex],
        tasks: tasksList1,
      };
      updatedState[nextListIndex] = {
        ...state[nextListIndex],
        tasks: tasksList2,
      };
      return updatedState;
    }
    default:
      return state
  }
};

