import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { styled } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";



function Cupboard () {
    const dispatch = useDispatch();
    const history = useHistory();

    // const defaultProps = {
    //     options: ingredients,
    //     getOptionLabel: (newIngredient) => newIngredient.ingredient_name,
        
    //   };

    // let [newIngredient, setNewIngredient] = useState({});


    const recipesList = useSelector(store => store.recipeReducer);
    const cupboard = useSelector (store => store.cupboardReducer);
    const matchesList = useSelector(store => store.matchesReducer);
    const matchingRecipes = useSelector(store => store.matchingRecipes)
    const ingredients = useSelector(store => store.ingredientsReducer)

    useEffect(() => {
    //   dispatch({ type: 'FETCH_RECIPES' })
    
        //this saga call fetches the user's cupboard to display in this component
      dispatch({ type: 'FETCH_CUPBOARD' })

      //this saga call compares the ingredients to the recipes
      dispatch({ type: 'COMPARE_CUPBOARD_RECIPES' });
      
    //   dispatch({ type: 'FETCH_INGREDIENTS' })
  
      
    }, []);

    const StyledTextField = styled(TextField)({
        [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
          borderColor: "#B8860B"
        },
        
      });


    //maybe instead of this do a get route with this info?
    const getMatches = () => {
   
        // dispatch({type: 'POST_MATCHING_RECIPES', payload: matchesList})
        // console.log(matchesList);
        history.push('/cupboard/recipes')
        // dispatch({type: 'FETCH_MATCHES'})

        // will need a new dispatch on cupboard list page to get from matching reducer
        
    }
    
    const deleteIngredient = (id) => {
        dispatch({type: 'DELETE_INGREDIENT', payload: id})
        // dispatch({ type: 'COMPARE_CUPBOARD_RECIPES' });
    }
  
    const addIngredients = () => {
        history.push('/cupboard/ingredients')
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

                            {/* <Box>
                            <Autocomplete
                                {...defaultProps}
                                disablePortal
                                id="ingredients"
                                onChange={(event, newIngredient) => {
                                    console.log(newIngredient);
                                    setNewIngredient(newIngredient);
                                }}
                                sx={{ width: 196 }}
                                style={{backgroundColor: "white"}}
                                renderInput={(params) => <StyledTextField {...params} placeholder="Ingredients" />}
                            />
                            </Box> */}
                
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
                                        onClick={addIngredients}
                                        
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

 