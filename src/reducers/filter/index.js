import { TOGGLE_FILTER } from '../../actions/types';

export default (state = false, action) => {
  switch (action.type) {
    case TOGGLE_FILTER: {
      return !state;
    }
    default:
      return state
  }
};

