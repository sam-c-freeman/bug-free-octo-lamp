import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function RecipesList () {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch({ type: 'FETCH_RECIPES' });
    }, []);
  
    const recipesList = useSelector(store => store.recipeReducer);
   
  
    
    return(
        <p>HI! I will be a list</p>
    )
}

export default RecipesList;