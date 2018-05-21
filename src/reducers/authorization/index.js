
import { AUTHORIZE_USER, LOG_OUT, REQUEST_AUTHORIZATION, PROMPT_ERROR } from '../../actions/types';

const initialState = {
  user: {
    loggedIn: false,
    authorizationOngoing: false,
    userData: {}
  }
};

export default function autorization(state = initialState, action) {
  switch (action.type) {
    case REQUEST_AUTHORIZATION: {
      return {
        ...state,
        authorizationOngoing: true
      }
    }
    case AUTHORIZE_USER: {
      return {
        ...state,
        user: {
          authorizationOngoing: false,
          loggedIn: true,
          userData: action.userData
        }
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        user: {
          authorizationOngoing: false,
          loggedIn: !state.user.loggedIn
        }
      }
    }
    case PROMPT_ERROR: {
      return {
        ...state,
        user: {
          authorizationOngoing: false,
          loggedIn: false
        },
        error: action.error
      }
    }
    default:
      return state
  }
}