import { AUTHORIZE_USER } from '../../actions/types';

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
    default:
      return state
  }
}