import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Explore.css';


function Explore () {
    const dispatch = useDispatch();


    const recipesList = useSelector(store => store.recipeReducer);
    

    useEffect(() => {
      dispatch({ type: 'FETCH_RECIPES' })

    }, []);

  
    //need to add sizing to images
    //do I want add recipe name to image?
    //need to fix css for images!
    return(
        <>
        {recipesList.map(recipe =>(
            <div key={recipe.id}>
                <h1>{recipe.name}</h1>
                <img src={recipe.image_url}></img>
            </div>
            
        ))}
        </>
        
    )
}

export default Explore;

