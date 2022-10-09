import './AddDrinkForm.css';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function AddDrinkForm (){
    // const ingredients = useSelector(store => )
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_INGREDIENTS' })
          
      }, []);
  
    
    return(
        <Stack 
            spacing={2}
            alignItems="center"
            >
            <TextField 
                id="name" 
                variant="outlined" 
                placeholder="Name"
                style={{backgroundColor: "white"}}
                sx={{width: 300}}
                 />
            <TextField 
                id="description" 
                variant="outlined"
                placeholder="Description"
                style={{backgroundColor: "white"}}
                sx={{width: 300}} />
            <TextField 
                id="notes" 
                variant="outlined"
                placeholder="Notes"
                style={{backgroundColor: "white"}}
                sx={{width: 300}} />
                <TextField 
                id="imageURL" 
                variant="outlined"
                placeholder="Image URL"
                style={{backgroundColor: "white"}}
                sx={{width: 300}} />
             
        </Stack>
    )
}

export default AddDrinkForm;

//Notes to self: Should I have an input label?