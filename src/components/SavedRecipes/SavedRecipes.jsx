import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Stack from '@mui/material/Stack';

//is this for saved recipes and other is explore?

function SavedRecipesList () {
    const dispatch = useDispatch();
    const history = useHistory();


    const savedRecipes = useSelector(store => store.savedRecipes);
    

    useEffect(() => {
      dispatch({ type: 'GET_SAVED_RECIPES' })

    }, []);

    const handleDetailsClick = (id) => {
        history.push(`/savedrecipes/${id}`)
    }

    const goToExplore = () =>{
        history.push('/explore')
    }
    
    return(
        <>
        {savedRecipes.length === 0 ? (
            <>
                <Stack alignItems="center" spacing={2}>
                    <h2>Search for Drinks</h2> 
                    <input 
                        className="btn" 
                        type="submit" 
                        name="submit" 
                        value="Explore Page"
                        onClick={goToExplore} />
                </Stack>
                    </>

                )  : (  //if there are saved recipes, render them:
        
                <>
                    {savedRecipes.map(recipe =>(
                        <div key={recipe.id}>
                            <h2>{recipe.name}</h2>
                            <img src={recipe.image_url} onClick={() => handleDetailsClick(recipe.id)}></img>
                        </div>
                        
                    ))}
                </>
                )}
            </>
    )
}

export default SavedRecipesList;

