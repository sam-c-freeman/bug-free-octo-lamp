// import { combineReducers } from 'redux';

const recipeReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_RECIPES':
        return action.payload;
    //   case 'UNSET_USER':
    //     return {};     <-------- do I need a clear recipes case?
      default:
        return state;
    }
  };

  
  export default recipeReducer;
  
  //change to combine reducers when I have more