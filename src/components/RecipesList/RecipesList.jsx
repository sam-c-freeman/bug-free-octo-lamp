import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function RecipesList () {
    const dispatch = useDispatch();


    const recipesList = useSelector(store => store.recipeReducer);
    const cupboard = useSelector (store => store.cupboardReducer);
    const matchesList = useSelector(store => store.matchesReducer);
    const matchingRecipes = useSelector(store => store.matchingRecipes)

    useEffect(() => {
      dispatch({ type: 'FETCH_RECIPES' })
      dispatch({ type: 'FETCH_CUPBOARD' })
      dispatch({ type: 'COMPARE_CUPBOARD_RECIPES' });
    //   setValues();

      
    }, []);

    const getMatches = () => {
        // console.log(matchesList);
        dispatch({type: 'POST_MATCHING_RECIPES', payload: matchesList})
        
    }
    // console.log(matchingRecipes);    <----- broke when two matches occurred
    //Looks like one recipe is here!!!

 
    // console.log(cupboard);
    // console.log(recipesList);
  
    

    //need to create recipesItem but not needed for spike
   
  
    
    return(
        <button onClick={getMatches}>Get Matching Recipes</button>
    )
}

export default RecipesList;

  // const setValues = () =>{
    //     setRecipes(recipesList);
    //     loopRecipeItems(recipesList);
    //     setCupboardItems(cupboard);
    // }