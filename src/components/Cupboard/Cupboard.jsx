import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';



function Cupboard () {
    const dispatch = useDispatch();


    const recipesList = useSelector(store => store.recipeReducer);
    const cupboard = useSelector (store => store.cupboardReducer);
    const matchesList = useSelector(store => store.matchesReducer);
    const matchingRecipes = useSelector(store => store.matchingRecipes)

    useEffect(() => {
      dispatch({ type: 'FETCH_RECIPES' })
      dispatch({ type: 'FETCH_CUPBOARD' })
      dispatch({ type: 'COMPARE_CUPBOARD_RECIPES' });
  
      
    }, []);


    //maybe instead of this do a get route with this info?
    const getMatches = () => {
   
        dispatch({type: 'POST_MATCHING_RECIPES', payload: matchesList})
        console.log(matchesList);
        // dispatch({type: 'FETCH_MATCHES'})
        
    }
    
    const deleteIngredient = (id) => {
        dispatch({type: 'DELETE_INGREDIENT', payload: id})
    }
  
    
    return(
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        >
        <Grid item xs={12}>
            <Card sx={{maxWidth: 345, minWidth: 345}}>
                {/* <Stack
                    spacing={2}
                    > */}
                   
                    <CardContent>
                        <Box
                            display="flex"
                            justifyContent="center">
                            <Typography gutterBottom variant="h4" component="div">
                                Pantry
                            </Typography>
                        </Box>
                        {cupboard ? (
                                <>
                                <ul>
                                {cupboard.map((ingredient, index) => {
                                    
                                    return(
                                        <li key={index}>
                                           <IconButton 
                                                aria-label="delete" 
                                                size="small"
                                                onClick={() => deleteIngredient(ingredient.id)}>
                                                    <DeleteIcon fontSize="small" />
                                            </IconButton>
                                           {ingredient.ingredient_name}
                                            
                                        </li>
                                        
                                    );
                                })}
                                </ul>
                                </>
                            ) : (<span></span>) }
                
                        <CardActions sx={{mt: 2}}>
                        <Box display="flex" justifyContent="center">
                            <input 
                                        className="btn_sizeSm btn" 
                                        type="submit" 
                                        name="submit"
                                        value="Suggest Recipes"
                                        onClick={getMatches}
                                        />
                            <input 
                                        className="btn_sizeSm btn" 
                                        type="submit" 
                                        name="submit"
                                        value="Add Ingredients"
                                        
                        />
                        </Box>
                        </CardActions>
                    </CardContent>
                {/* </Stack> */}
            </Card>
         </Grid>
    </Grid>
        
    )
}

export default Cupboard;

 