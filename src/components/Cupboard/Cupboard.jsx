import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function Cupboard () {
    const dispatch = useDispatch();


    const recipesList = useSelector(store => store.recipeReducer);
    const cupboard = useSelector (store => store.cupboardReducer);
    const matchesList = useSelector(store => store.matchesReducer);
    const matchingRecipes = useSelector(store => store.matchingRecipes)

    useEffect(() => {
    //   dispatch({type: 'CLEAR_PREVIOUS_MATCHES'})
      dispatch({ type: 'FETCH_RECIPES' })
      dispatch({ type: 'FETCH_CUPBOARD' })
      dispatch({ type: 'COMPARE_CUPBOARD_RECIPES' });
  
      
    }, []);


    //maybe instead of this do a get route with this info?
    const getMatches = () => {
   
        dispatch({type: 'POST_MATCHING_RECIPES', payload: matchesList})
        console.log(matchesList);
        
    }

    //  const getMatches = () => {
   
    //     dispatch({type: 'TEST_MATCHING_RECIPES', payload: matchesList})
    //     console.log(matchesList);
        
    // }
   
  
    
    return(
        <button onClick={getMatches}>Get Matching Recipes</button>
    )
}

export default Cupboard;

 