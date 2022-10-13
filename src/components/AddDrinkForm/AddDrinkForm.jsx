import './AddDrinkForm.css';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

function AddDrinkForm (){
    const ingredients = useSelector(store => store.ingredientsReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_INGREDIENTS' })        
      }, []);
  
    const defaultProps = {
        options: ingredients,
        getOptionLabel: (ingredient) => ingredient.name,
        
      };

       
    let [name, setName] = useState('');
    let [description, setDescription] = useState('');
    let [notes, setNotes] = useState('');
    let [image_url, setImage_url] = useState('');
    
    //each ingredient will be seperate?
    let [quantity1, setQuantity1] = useState('');
    let [ingredient1, setIngredient1] = useState({});

    let [quantity2, setQuantity2] = useState('');
    let [ingredient2, setIngredient2] = useState({});

    let [quantity3, setQuantity3] = useState('');
    let [ingredient3, setIngredient3] = useState({});

    let [quantity4, setQuantity4] = useState('');
    let [ingredient4, setIngredient4] = useState({});


    let [quantity5, setQuantity5] = useState('');
    let [ingredient5, setIngredient5] = useState({});
      
      const history = useHistory();
      
      const backToHome = () =>{
          history.push('/savedrecipes')
    }

  
      const addRecipe = event => {
          event.preventDefault();
     
        const action = {
            type: 'ADD_RECIPE',
            payload: {
                name: name,
                description: description,
                notes: notes,
                image_url: image_url,
                ingredients: [
                    {
                        ingredient: ingredient1.id,
                        quantity: quantity1,
                    },
                    {
                        ingredient: ingredient2.id,
                        quantity: quantity2,
                    },
                    {
                        ingredient: ingredient3.id,
                        quantity: quantity3,
                    },
                    {
                        ingredient: ingredient4.id,
                        quantity: quantity4,
                    },
                    {
                       ingredient: ingredient5.id,
                       quantity: quantity5,
                    }
                ]
              
            }
        }
        dispatch(action);
        backToHome();
      }
  
    //   const checkEmpty = (event) => {
    //       if(newMovie.title === '' || newMovie.poster === '' || newMovie.description === '' || newMovie.genre === ''){
    //           alert('Please enter all values!')
    //       }
    //       else{
    //           addNewMovie(event);
    //       }
    //   }    <---------DO I WANT TO USE THIS?


  
    
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
                                    Add a Drink 
                        </Typography>
                        <TextField 
                            id="name" 
                            variant="outlined" 
                            placeholder="Name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            style={{backgroundColor: "white"}}
                            sx={{width: 300}}
                            />
                        <TextField 
                            id="description" 
                            variant="outlined"
                            placeholder="Description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            multiline
                            rows={2}
                            style={{backgroundColor: "white"}}
                            sx={{width: 300}} />
                        <TextField 
                            id="notes" 
                            variant="outlined"
                            placeholder="Notes"
                            value={notes}
                            onChange={(event) => setNotes(event.target.value)}
                            multiline
                            rows={2}
                            style={{backgroundColor: "white"}}
                            sx={{width: 300}} />
                        <TextField 
                            id="imageURL" 
                            variant="outlined"
                            placeholder="Image URL"
                            value={image_url}
                            onChange={(event) => setImage_url(event.target.value)}
                            style={{backgroundColor: "white"}}
                            sx={{width: 300}} />
                        <div className="side-by-side">
                            <TextField 
                                id="quantity1" 
                                variant="outlined"
                                placeholder="Quantity"
                                value={quantity1}
                                onChange={(event) => setQuantity1(event.target.value)}
                                style={{backgroundColor: "white"}}
                                sx={{width: 96, marginRight: 1}} />
                            <Autocomplete
                                {...defaultProps}
                                disablePortal
                                id="ingredient1"
                                
                                // isOptionEqualToValue = {{option, value} => option.id === value.id}}
                                onChange={(event, ingredient1) => {
                                    setIngredient1;
                                }}
                                sx={{ width: 196 }}
                                style={{backgroundColor: "white"}}
                                renderInput={(params) => <TextField {...params} placeholder="Ingredients" />}
                            />
                        </div>
                    
                        <div className="side-by-side">
                            <TextField 
                                id="quantity2" 
                                variant="outlined"
                                placeholder="Quantity"
                                value={quantity2}
                                onChange={(event) => setQuantity2(event.target.value)}
                                style={{backgroundColor: "white"}}
                                sx={{width: 96, marginRight: 1}} />
                            <Autocomplete
                                {...defaultProps}
                                disablePortal
                                id="ingredient2"
                                onChange={(event, ingredient2) => {
                                    // console.log(ingredient2);
                                    setIngredient2(ingredient2);
                                }}
                                sx={{ width: 196 }}
                                style={{backgroundColor: "white"}}
                                renderInput={(params) => <TextField {...params} placeholder="Ingredients" />}
                            />
                        </div>
                        <div className="side-by-side">
                            <TextField 
                                id="quantity3" 
                                variant="outlined"
                                placeholder="Quantity"
                                value={quantity3}
                            
                                onChange={(event) => setQuantity3(event.target.value)}
                                style={{backgroundColor: "white"}}
                                sx={{width: 96, marginRight: 1}} />
                            <Autocomplete
                                {...defaultProps}
                                disablePortal
                                id="ingredients3"
                                onChange={(event, ingredient3) => {
                                    console.log(ingredient3);
                                    setIngredient3(ingredient3);
                                }}
                            
                                sx={{ width: 196 }}
                                style={{backgroundColor: "white"}}
                                renderInput={(params) => <TextField {...params} placeholder="Ingredients" />}
                            />
                        </div>

                        <div className="side-by-side">
                            <TextField 
                                id="quantity4" 
                                variant="outlined"
                                placeholder="Quantity"
                                value={quantity4}
                                onChange={(event) => setQuantity4(event.target.value)}
                                style={{backgroundColor: "white"}}
                                sx={{width: 96, marginRight: 1}} />
                            <Autocomplete
                                {...defaultProps}
                                disablePortal
                                id="ingredients4"
                                onChange={(event, ingredient4) => {
                                    console.log(ingredient4);
                                    setIngredient4(ingredient4);
                                }}
                            
                                sx={{ width: 196 }}
                                style={{backgroundColor: "white"}}
                                renderInput={(params) => <TextField {...params} placeholder="Ingredients" />}
                            />
                        </div>
                        <div className="side-by-side">
                            <TextField 
                                id="quantity5" 
                                variant="outlined"
                                placeholder="Quantity"
                                value={quantity5}
                                onChange={(event) => setQuantity5(event.target.value)}
                                style={{backgroundColor: "white"}}
                                sx={{width: 96, marginRight: 1}} />
                            <Autocomplete
                                {...defaultProps}
                                disablePortal
                                id="ingredients"
                                onChange={(event, ingredient5) => {
                                    console.log(ingredient5);
                                    setIngredient5(ingredient5);
                                }}
                            
                                sx={{ width: 196 }}
                                style={{backgroundColor: "white"}}
                                renderInput={(params) => <TextField {...params} placeholder="Ingredients" />}
                            /> 
                        </div>
                            <input 
                                className="btn" 
                                type="submit" 
                                name="submit"
                                value="Save Recipe"
                                onClick={addRecipe}
                                />
                              
                    </Stack>
                </form>
            </Card>
        </Grid>
    </Grid>
    )
}

export default AddDrinkForm;

//Notes to self: Should I have an input label?