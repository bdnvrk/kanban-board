import omit from 'lodash/fp/omit';
import { 
  ADD_NEW_TASK, 
  REMOVE_TASKS, 
  REMOVE_SINGLE_TASK,
  EDIT_TASK, 
  SAVED_DATA_FROM_DATABASE 
} from '../../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_TASK: {
      const { taskId, taskData } = action.payload;

      return {
        ...state,
        [taskId]: {
          id: taskId,
          ...taskData,
        },
      };
    }
    case REMOVE_SINGLE_TASK: {
      const { taskId } = action.payload;

      return omit([taskId])(state);
    }
    case REMOVE_TASKS: {
      const { tasks } = action.payload;

      return omit(tasks)(state);
    }
    case EDIT_TASK: {
      const { id, taskData } = action.payload;
      
      return {
        ...state,
        [id]: {
          id,
          ...taskData,
        },
      }
    }
    case SAVED_DATA_FROM_DATABASE: {
      return {
        ...action.data.tasks
      }
    }
    default:
      return state
  }
}
