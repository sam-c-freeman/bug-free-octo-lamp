import './AddDrinkForm.css';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

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

     
    let [newRecipe, setRecipe] = useState({name: '', 
                                            description: '', 
                                            notes:'', 
                                            image_url:''});
                                            
    let [newLineItem, setLineItem] = useState({quantity: '', 
                                                id: '',
                                                name: '' });

    let [newQuantity, setQuantity] = useState('');

    let [value, setValue] = useState(null);
    let [id, setId] = useState(null);
    let [name, setName] = useState(null);                                            
      
      const history = useHistory();
      
      const backToHome = () =>{
          history.push('/user')
    }
  
      const handleRecipeChange = (recipeKey) => (event) => {
          console.log('creating new recipe', newRecipe);
          setRecipe({...newRecipe, [recipeKey]: event.target.value})
      }

      const handleIngredientChange = (ingredientKey) => (event) => {
        console.log('creating new indredient line item', newLineItem);
        setLineItem({...newLineItem, [ingredientKey]: event.target.value})
        
    }

  
      const addRecipe = event => {
          event.preventDefault();
          dispatch({ type: 'ADD_RECIPE', payload: newRecipe });
          setRecipe({name: '', 
          description: '', 
          notes:'', 
          image_url:''});
      }
  
    //   const checkEmpty = (event) => {
    //       if(newMovie.title === '' || newMovie.poster === '' || newMovie.description === '' || newMovie.genre === ''){
    //           alert('Please enter all values!')
    //       }
    //       else{
    //           addNewMovie(event);
    //       }
    //   }    <---------DO I WANT TO USE THIS?

    // const addInput = () => {
    //     console.log('hi')
    // }

  
    
    return(
        <form>
            <Stack 
                spacing={2}
                alignItems="center"
                >
                <TextField 
                    id="name" 
                    variant="outlined" 
                    placeholder="Name"
                    value={newRecipe.name}
                    onChange={handleRecipeChange('name')}
                    style={{backgroundColor: "white"}}
                    sx={{width: 300}}
                    />
                <TextField 
                    id="description" 
                    variant="outlined"
                    placeholder="Description"
                    value={newRecipe.description}
                    onChange={handleRecipeChange('description')}
                    multiline
                    rows={2}
                    style={{backgroundColor: "white"}}
                    sx={{width: 300}} />
                <TextField 
                    id="notes" 
                    variant="outlined"
                    placeholder="Notes"
                    value={newRecipe.notes}
                    onChange={handleRecipeChange('notes')}
                    multiline
                    rows={2}
                    style={{backgroundColor: "white"}}
                    sx={{width: 300}} />
                <TextField 
                    id="imageURL" 
                    variant="outlined"
                    placeholder="Image URL"
                    value={newRecipe.image_url}
                    onChange={handleRecipeChange('image_url')}
                    style={{backgroundColor: "white"}}
                    sx={{width: 300}} />
                <div className="side-by-side">
                    <TextField 
                        id="quantity" 
                        variant="outlined"
                        placeholder="Quantity"
                        value={newLineItem.quantity}
                        onChange={handleIngredientChange('quantity')}
                        style={{backgroundColor: "white"}}
                        sx={{width: 96, marginRight: 1}} />
                    <Autocomplete
                        {...defaultProps}
                        disablePortal
                        id="ingredients"
                        
                        // onChange={(event, newValue) => {
                        //     console.log(newValue);
                        //     if (newValue) {
                        //       setValue(newValue);
                        //       setId(newValue.id);
                        //       setName(newValue.name);
                        //     }
                        //   }}
                        
                        
                        
                        value={ingredients.name}
                        onSelect={handleIngredientChange('name')}
                        sx={{ width: 196 }}
                        style={{backgroundColor: "white"}}
                        renderInput={(params) => <TextField {...params} placeholder="Ingredients" />}
                    />
                </div>
                {/* <input 
                className="btn" 
                type="submit" 
                name="submit"
                value="Add Ingredient"
                onClick={addInput}/> */}
                <div className="side-by-side">
                    {/* <TextField 
                        id="quantity" 
                        variant="outlined"
                        placeholder="Quantity"
                        value={newLineItem.quantity}
                        onChange={handleIngredientChange('quantity')}
                        style={{backgroundColor: "white"}}
                        sx={{width: 96, marginRight: 1}} />
                    <Autocomplete
                        {...defaultProps}
                        disablePortal
                        id="ingredients"
                        value={ingredients.name}
                        onSelect={handleIngredientChange('name')}
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
                        style={{backgroundColor: "white"}}
                        sx={{width: 96, marginRight: 1}} />
                    <Autocomplete
                        {...defaultProps}
                        disablePortal
                        id="ingredients"
                    
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
                        style={{backgroundColor: "white"}}
                        sx={{width: 96, marginRight: 1}} />
                    <Autocomplete
                        {...defaultProps}
                        disablePortal
                        id="ingredients"
                    
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
                        style={{backgroundColor: "white"}}
                        sx={{width: 96, marginRight: 1}} />
                    <Autocomplete
                        {...defaultProps}
                        disablePortal
                        id="ingredients"
                    
                        sx={{ width: 196 }}
                        style={{backgroundColor: "white"}}
                        renderInput={(params) => <TextField {...params} placeholder="Ingredients" />}
                    /> */}
                </div>
                    <input 
                        className="btn" 
                        type="submit" 
                        name="submit"
                        value="Save Recipe"
                        onClick={addRecipe}/>
            </Stack>
        </form>
    )
}

export default AddDrinkForm;

//Notes to self: Should I have an input label?