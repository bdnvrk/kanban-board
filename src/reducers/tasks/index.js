import omit from 'lodash/fp/omit';
import { ADD_NEW_TASK, REMOVE_TASKS } from '../../actions/types';

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
    case REMOVE_TASKS: {
      const { tasks } = action.payload;

      return omit(tasks)(state);
    }
    default:
      return state
  }
}
