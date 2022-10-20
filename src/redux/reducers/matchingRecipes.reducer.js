const matchingRecipes = (state = [], action) => {
    switch (action.type) {
        case 'SET_MATCHING_RECIPES':
          return action.payload;
        default:
          return state;
      }
      
  }

  export default matchingRecipes;



