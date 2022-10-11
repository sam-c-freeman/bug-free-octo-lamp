import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


function SavedDrinkDetails () {


const params = useParams();
const dispatch = useDispatch();
const history = useHistory();
const drinkId = params.id
const drink = useSelector(store => store.oneDrink)


    useEffect(() => {
        dispatch ({
            type: 'FETCH_DRINK_DETAILS',
            payload: drinkId
        })
        
        return () => {
            dispatch({
              type: 'CLEAR_DRINK_DETAILS'
            })
          }
        }, [drinkId])
    
    console.log('hi')
    return(
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        >
        <Grid item xs={12}>
            <Card sx={{maxWidth: 345}}>
                <CardMedia
                    component="img"
                    height="140"
                    image={drink.image_url}
                    />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {drink.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" component="div">
                    <Box sx={{ fontWeight: 'bold'}}>Description:</Box> {drink.description}
                    </Typography>

                    <Typography variant="body1" color="text.secondary" component="div">
                    <Box sx={{ fontWeight: 'bold'}}> Test Recipe:</Box> {drink.recipe}
                    </Typography> 
                

                    {drink.notes ?  //won't render if there are not notes
                        <Typography variant="body1" color="text.secondary" component="div">
                           <Box sx={{ fontWeight: 'bold'}}> Notes:</Box> {drink.notes}
                        </Typography>
                    : null }
                    
                    <Typography variant="body1" color="text.secondary" component="div">
                       
                    <Box sx={{ fontWeight: 'bold'}}>Recipe:</Box> 
                    
                             {drink.recipe ? (
                                <>
                                {drink.recipe.map((ingredient, index) => {
                                    <ul>
                                    return(
                                        <li key={index}>{ingredient}</li>
                                    );
                                    </ul>
                                })}
                                </>
                            ) : (<span></span>) }
                       
                    </Typography>
                   
                   
                    <CardActions sx={{mt: 2}}>
                        <Button size="small" >Edit</Button>
                        <Button size="small">Delete</Button>
                    </CardActions>
                </CardContent>
            </Card>
         </Grid>
    </Grid>

    )
}

export default SavedDrinkDetails;

