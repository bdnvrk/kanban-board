
import { 
  UPDATE_DATABASE, 
  SAVED_DATA_FROM_DATABASE,  
  SAVED_DATA_TO_DATABASE 
} from '../../actions/types';

const initialState = {
  databaseConneciton: {
    databaseUpdated: false,
    databaseBeingUpdated: false,
    isDataSynced: false
  }
};

export default function databaseConneciton(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DATABASE: {
      return {
        ...state,
        databaseBeingUpdated: true,
      }
    }
    case SAVED_DATA_TO_DATABASE: {
      return {
        ...state,
        databaseBeingUpdated: false,
        databaseUpdated: true
      }
    }
    case SAVED_DATA_FROM_DATABASE: {
      return {
        ...state,
        data: action.data
      }
    }

    default:
      return state
  }
}