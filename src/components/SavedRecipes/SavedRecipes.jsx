import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


//is this for saved recipes and other is explore?

function SavedRecipesList () {
    const dispatch = useDispatch();
    const history = useHistory();


    const savedRecipes = useSelector(store => store.savedRecipes);
    

    useEffect(() => {
      dispatch({ type: 'GET_SAVED_RECIPES' })

    }, []);

    const handleDetailsClick = (id) => {
        history.push(`/recipes/${id}`)
    }
    
    return(
        <>
        {savedRecipes.map(recipe =>(
            <div key={recipe.id}>
                <h2>{recipe.name}</h2>
                <img src={recipe.image_url} onClick={() => handleDetailsClick(recipe.id)}></img>
            </div>
            
        ))}
        </>
    )
}

export default SavedRecipesList;

