import { TOGGLE_LOADER } from '../../actions/types';

export default (state = true, action) => {
  switch (action.type) {
    case TOGGLE_LOADER: {
      return false;
    }
    default:
      return state
  }
};