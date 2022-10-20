import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

function CupboardRecipes () {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        // dispatch({ type: 'GET_MATCHING_RECIPES' })
  
      }, []);

    const goBack = () => {
        history.push('/cupboard')
    }

    const handleDetailsClick = (id) => {
        history.push(`/cupboard/recipes/${id}`)
    }
  
    const matchingRecipes = useSelector(store => store.matchingRecipes)
    
    return(
        
    

    <>
        {matchingRecipes.length === 0 ? (
            <>
                <Stack alignItems="center" spacing={2}>
                    <h2>Add More Ingredients</h2> 
                    <input 
                        className="btn" 
                        type="submit" 
                        name="submit" 
                        value="Back"
                        onClick={goBack }
                        />
                </Stack>
                    </>
        ) : (
        
        <>
        <Box display="flex" justifyContent="right" sx={{mr: 2}}>
                <input 
                    className="btn_sizeSm btn" 
                    type="submit" 
                    name="submit"
                    value="Back"
                    onClick={goBack}
                />
        </Box>

        {matchingRecipes.map(recipe =>(
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

export default CupboardRecipes;