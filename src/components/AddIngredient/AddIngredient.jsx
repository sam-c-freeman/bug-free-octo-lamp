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
import './AddIngredient.css'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { styled } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

//to Do:
//1. Make sure useState is correctly selecting from autocomplete list
//2. Dispatch to a post route to add to the ingredients to the cupboard table for that user
//3. Refresh addingredient page on each post 
//4. Make sure it also fetches when back to cupboard.
//5. Check if new recipes are added to matches!

function AddIngredient () {
    const dispatch = useDispatch();
    const history = useHistory();

   

    let [newIngredient, setNewIngredient] = useState({});


   
    const cupboard = useSelector (store => store.cupboardReducer);
    const ingredients = useSelector(store => store.ingredientsReducer)

    useEffect(() => {
      dispatch({ type: 'FETCH_INGREDIENTS' })
      dispatch({type: 'FETCH_CUPBOARD'})
  
      
    }, []);

    const defaultProps = {
        options: ingredients,
        getOptionLabel: (newIngredient) => newIngredient.ingredient_name,
        
      };


    const addIngredients = () => {
        // console.log(newIngredient)
        dispatch({type: 'ADD_INGREDIENT', payload: newIngredient})
    }

    const goBackToCupboard = () => {
        history.push('/cupboard')
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
                    <Box display="flex" justifyContent="right">
                        <input 
                                            className="btn_sizeSm btn" 
                                            type="submit" 
                                            name="Back"
                                            value="Back"
                                            onClick={goBackToCupboard}
                                            
                            />
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="center">
                            <Typography gutterBottom variant="h4" component="div">
                                Add Ingredients
                            </Typography>
                        </Box>
                        {cupboard ? (
                                <>
                                <ul>
                                {cupboard.map((ingredient, index) => {
                                    
                                    return(
                                        <li key={index}>
                                           {/* <IconButton 
                                                aria-label="delete" 
                                                size="small"
                                                onClick={() => deleteIngredient(ingredient.id)}>
                                                    <DeleteIcon fontSize="small" />
                                            </IconButton> */}
                                           {ingredient.ingredient_name}
                                            
                                        </li>
                                        
                                    );
                                })}
                                </ul>
                                </>
                            ) : (<span></span>) }

                       
                
                        <CardActions sx={{mt: 2}}>
                        <Box display="flex" justifyContent="center" className="side-by-side" >
                        <Autocomplete
                                {...defaultProps}
                                disablePortal
                                id="ingredient"
                                onChange={(event, newIngredient) => {
                                    setNewIngredient(newIngredient);
                                    console.log(newIngredient)
                                }}
                             
                                isOptionEqualToValue={(option, value) => option.id === value.id} 
                                sx={{ width: 150 }}
                                style={{backgroundColor: "white"}}
                                renderInput={(params) => <TextField {...params} placeholder="Ingredients" />}
                            />
                    
                            <input 
                                        className="btn_sizeMin Add" 
                                        type="submit" 
                                        name="submit"
                                        value="Add Ingredient"
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

export default AddIngredient;

 