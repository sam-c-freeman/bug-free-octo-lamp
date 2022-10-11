const savedRecipes = (state = [], action) => {
    switch (action.type) {
        case 'SET_SAVED_RECIPES':
          return action.payload;
        default:
          return state;
      }
  }

  export default savedRecipes;


