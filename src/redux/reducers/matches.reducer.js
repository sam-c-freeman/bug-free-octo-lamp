const matchesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MATCHING_IDS':
          return action.payload;
        default:
          return state;
      }
  }

  export default matchesReducer;



