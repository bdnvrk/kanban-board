
import { 
  UPDATE_DATABASE, 
  SAVE_DATA_FROM_DATABASE,  
  SAVED_DATA_TO_DATABASE 
} from '../../actions/types';
import { stat } from 'fs/promises';

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

    default:
      return state
  }
}