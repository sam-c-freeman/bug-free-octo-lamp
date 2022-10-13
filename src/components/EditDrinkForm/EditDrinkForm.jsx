import './EditDrinkForm.css';
import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

//import MUI components
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function EditDrinkForm () {
    const params = useParams();
    const dispatch = useDispatch();


    useEffect(() =>{
        dispatch({
            type: 'FETCH_DRINK_TO_EDIT',
            payload: params.id
        })
        dispatch({ type: 'FETCH_INGREDIENTS' })   
    }, [params.id])

    const drinkToEdit = useSelector(store => store.drinkToEdit)
    const ingredients = useSelector(store => store.ingredientsReducer)
    const history = useHistory();

    const defaultProps = {
        options: ingredients,
        getOptionLabel: (ingredient) => ingredient.name,
        
      };  //this gets the ingredients into the select menu

    // const quantity1 = drinkToEdit.quantity[0] || '';
    // console.log(drinkToEdit.quantity)
    // const ingredient1 = drinkToEdit.ingredients[0] || '';


    //this dispatch will update the drink after the user pushes confirm
    const handleConfirm = (e) => {
        e.preventDefault();
        // dispatch the updated drink object to a saga function:
        dispatch({
          type: 'UPDATE_DRINK',
          payload: drinkToEdit
        })
        history.push(`/savedrecipes/${params.id}`) //where do I want it to go?
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
        <Card sx={{minWidth: 345}}>
            <form>
                <Stack 
                    spacing={2}
                    alignItems="center"
                    >
                    <Typography gutterBottom variant="h4" component="div" className="title" sx={{mt: 2}}>
                                {drinkToEdit.name}
                    </Typography>
                    <TextField 
                        id="name" 
                        variant="outlined" 
                        placeholder="Name"
                        value={drinkToEdit.name || ''}
                        onChange={(event) => dispatch({type: 'EDIT_NAME', payload: event.target.value})}
                        style={{backgroundColor: "white"}}
                        sx={{width: 300}}
                        />
                    <TextField 
                        id="description" 
                        variant="outlined"
                        placeholder="Description"
                        value={drinkToEdit.description || ''}
                        onChange={(event) => dispatch({type: 'EDIT_DESCRIPTION', payload: event.target.value})}
                        multiline
                        rows={2}
                        style={{backgroundColor: "white"}}
                        sx={{width: 300}} />
                    <TextField 
                        id="notes" 
                        variant="outlined"
                        placeholder="Notes"
                        value={drinkToEdit.notes || ''}
                        onChange={(event) => dispatch({type: 'EDIT_NOTES', payload: event.target.value})}
                        
                        multiline
                        rows={2}
                        style={{backgroundColor: "white"}}
                        sx={{width: 300}} />
                    <TextField 
                        id="imageURL" 
                        variant="outlined"
                        placeholder="Image URL"
                        value={drinkToEdit.image_url || ''}
                        onChange={(event) => dispatch({type: 'EDIT_IMAGE_URL', payload: event.target.value})}
                        style={{backgroundColor: "white"}}
                        sx={{width: 300}} />
                    <div className="side-by-side">
                        <TextField 
                            id="quantity" 
                            variant="outlined"
                            placeholder="Quantity"
                            // value={quantity1}
                            // onChange={(event) => dispatch({type: 'EDIT_QUANTITY1', payload: event.target.value})}
                            style={{backgroundColor: "white"}}
                            sx={{width: 96, marginRight: 1}} />
                        <Autocomplete
                            {...defaultProps}
                            disablePortal
                            id="ingredients"
                            // value ={ingredient1}
                            // onChange={(event, ingredient1) => {
                            //     console.log(ingredient1);
                            //     if (ingredient1) {
                            //     setIngredient1(ingredient1);
                            //     setIngredientId1(ingredient1.id);
                            //     setIngredientName1(ingredient1.name);
                            //     }
                            // }}
                            sx={{ width: 196 }}
                            style={{backgroundColor: "white"}}
                            renderInput={(params) => <TextField {...params} placeholder="Ingredients" />}
                        />
                    </div>
                
                    <div className="side-by-side">
                        <TextField 
                            id="quantity" 
                            variant="outlined"
                            placeholder="Quantity"
                            // value={quantity2}
                            // onChange={(event) => setQuantity2(event.target.value)}
                            style={{backgroundColor: "white"}}
                            sx={{width: 96, marginRight: 1}} />
                        <Autocomplete
                            {...defaultProps}
                            disablePortal
                            id="ingredients"
                            // onChange={(event, ingredient2) => {
                            //     console.log(ingredient2);
                            //     if (ingredient2) {
                            //     setIngredient2(ingredient2);
                            //     setIngredientId2(ingredient2.id);
                            //     setIngredientName2(ingredient2.name);
                            //     }
                            // }}
                            sx={{ width: 196 }}
                            style={{backgroundColor: "white"}}
                            renderInput={(params) => <TextField {...params} placeholder="Ingredients" />}
                        />
                    </div>
                    <div className="side-by-side">
                        <TextField 
                            id="quantity" 
                            variant="outlined"
                            placeholder="Quantity"
                            // value={quantity3}
                        
                            // onChange={(event) => setQuantity3(event.target.value)}
                            style={{backgroundColor: "white"}}
                            sx={{width: 96, marginRight: 1}} />
                        <Autocomplete
                            {...defaultProps}
                            disablePortal
                            id="ingredients"
                            // onChange={(event, ingredient3) => {
                            //     console.log(ingredient3);
                            //     if (ingredient3) {
                            //     setIngredient3(ingredient3);
                            //     setIngredientId3(ingredient3.id);
                            //     setIngredientName3(ingredient3.name);
                            //     }
                            // }}
                        
                            sx={{ width: 196 }}
                            style={{backgroundColor: "white"}}
                            renderInput={(params) => <TextField {...params} placeholder="Ingredients" />}
                        />
                    </div>

                    <div className="side-by-side">
                        <TextField 
                            id="quantity" 
                            variant="outlined"
                            placeholder="Quantity"
                            // value={quantity4}
                            // onChange={(event) => setQuantity4(event.target.value)}
                            style={{backgroundColor: "white"}}
                            sx={{width: 96, marginRight: 1}} />
                        <Autocomplete
                            {...defaultProps}
                            disablePortal
                            id="ingredients"
                            // onChange={(event, ingredient4) => {
                            //     console.log(ingredient4);
                            //     if (ingredient4) {
                            //     setIngredient4(ingredient4);
                            //     setIngredientId4(ingredient4.id);
                            //     setIngredientName4(ingredient4.name);
                            //     }
                            // }}
                        
                            sx={{ width: 196 }}
                            style={{backgroundColor: "white"}}
                            renderInput={(params) => <TextField {...params} placeholder="Ingredients" />}
                        />
                    </div>
                    <div className="side-by-side">
                        <TextField 
                            id="quantity" 
                            variant="outlined"
                            placeholder="Quantity"
                            // value={quantity5}
                            // onChange={(event) => setQuantity5(event.target.value)}
                            style={{backgroundColor: "white"}}
                            sx={{width: 96, marginRight: 1}} />
                        <Autocomplete
                            {...defaultProps}
                            disablePortal
                            id="ingredients"
                            // onChange={(event, ingredient5) => {
                            //     console.log(ingredient5);
                            //     if (ingredient5) {
                            //     setIngredient5(ingredient5);
                            //     setIngredientId5(ingredient5.id);
                            //     setIngredientName5(ingredient5.name);
                            //     }
                            // }}
                        
                            sx={{ width: 196 }}
                            style={{backgroundColor: "white"}}
                            renderInput={(params) => <TextField {...params} placeholder="Ingredients" />}
                        /> 
                    </div>
                        <input 
                            className="btn" 
                            type="submit" 
                            name="submit"
                            value="Confirm Changes"
                            onClick={handleConfirm}
                            />
                          
                </Stack>
            </form>
        </Card>
    </Grid>
</Grid>
    )
}

export default EditDrinkForm;