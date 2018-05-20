import omit from 'lodash/fp/omit';
import { 
  ADD_NEW_TASK, 
  REMOVE_TASKS, 
  REMOVE_SINGLE_TASK,
  SAVED_DATA_FROM_DATABASE 
} from '../../actions/types';

const initialState = {
  task_0: {
    id: 'task_0',
    name: 'Autoryzacja',
    description: 'qdsnjgndskjg',
    priority: 'high',
    deadline: '2018-05-12'
  },
};

export default (state = initialState, action) => {
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
    case SAVED_DATA_FROM_DATABASE: {
      return {
        ...action.data.tasks
      }
    }
    default:
      return state
  }
}
