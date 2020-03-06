const initialState = [];

function reducer(state = initialState, action) {
  switch (action.type) {
    case "ALL_MESSAGES": {
      return action.payload;
    }
    case "NEW_MESSAGE": {
      return [...state, action.payload];
    }
    default:
      return state;
  }
}

export default reducer;
