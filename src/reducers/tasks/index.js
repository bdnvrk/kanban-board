import { ADD_NEW_TASK } from '../../actions/types';

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
    default:
      return state
  }
}