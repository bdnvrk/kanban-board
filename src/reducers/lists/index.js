const initialState = {
  field: 'testValue',
};

export default function counter(state = initialState, action) {
  switch (action.type) {
    case 'ACTION':
      return 'test action value';
    default:
      return state
  }
}