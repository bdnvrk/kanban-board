import uniqueId from 'lodash/fp/uniqueId';
import { ADD_NEW_LIST } from '../../actions/types';

const initialId = uniqueId('list_');

const initialState = {
  [initialId]: {
    id: initialId,
    name: 'Twoja pierwsza lista',
    order: 0,
    tasks: [],
  },
};

export default function counter(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_LIST: {
      const { name } = action.payload;
      const id = uniqueId('list_');

      return {
        ...state,
        [id]: {
          id,
          name,
          order: state.length,
          tasks: [],
        },
      };
    }
    default:
      return state
  }
}