import get from 'lodash/fp/get';
import { AUTHORIZE_USER, SAVED_DATA_FROM_DATABASE } from '../../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case AUTHORIZE_USER: {
      const { uid, displayName } = action.userData;

      return state[uid] 
        ? state
        : {
          ...state,
          [uid]: displayName,
        };
    }
    case SAVED_DATA_FROM_DATABASE: {
      const users = get('data.users')(action);
      return {
        ...state,
        ...users,
      }
    }
    default:
      return state
  }
}