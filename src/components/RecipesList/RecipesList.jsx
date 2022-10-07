import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function RecipesList () {
    const dispatch = useDispatch();
    // const [recipes, setRecipes] = useState('');
    // const [cupboardItems, setCupboardItems] = useState('');

    const recipesList = useSelector(store => store.recipeReducer);
    const cupboard = useSelector (store => store.cupboardReducer);

    useEffect(() => {
      dispatch({ type: 'FETCH_RECIPES' })
      dispatch({ type: 'FETCH_CUPBOARD' })
      dispatch({ type: 'COMPARE_CUPBOARD_RECIPES' });
    //   setValues();
    loopRecipeItems();
      
    }, []);

    const loopRecipeItems = () => {
        for (let i=0; i <recipesList.length; i++){
            console.log(i.name)
        }
    }

    console.log(cupboard);
    console.log(recipesList);
  
    

    //need to create recipesItem but not needed for spike
   
  
    
    return(
        <p>HI! I will be a list</p>
    )
}

export default RecipesList;

  // const setValues = () =>{
    //     setRecipes(recipesList);
    //     loopRecipeItems(recipesList);
    //     setCupboardItems(cupboard);
    // }