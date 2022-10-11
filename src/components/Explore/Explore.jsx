import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Explore.css';


function Explore () {
    const dispatch = useDispatch();
    const history = useHistory();


    const recipesList = useSelector(store => store.recipeReducer);
    

    useEffect(() => {
      dispatch({ type: 'FETCH_RECIPES' })

    }, []);

    const handleDetailsClick = (id) => {
        history.push(`/recipes/${id}`)
    }


  
    //need to add sizing to images
    //do I want add recipe name to image?
    //need to fix css for images!
    return(
        <>
        {recipesList.map(recipe =>(
            <div key={recipe.id}>
                <h2>{recipe.name}</h2>
                <img src={recipe.image_url} onClick={() => handleDetailsClick(recipe.id)}></img>
            </div>
            
        ))}
        </>
        
    )
}

export default Explore;

