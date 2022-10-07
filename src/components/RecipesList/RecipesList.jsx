import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function RecipesList () {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch({ type: 'FETCH_RECIPES' })
      dispatch({ type: 'FETCH_CUPBOARD' });
    }, []);
  
    const recipesList = useSelector(store => store.recipeReducer);

    //need to create recipesItem but not needed for spike
   
  
    
    return(
        <p>HI! I will be a list</p>
    )
}

export default RecipesList;