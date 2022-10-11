import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import HomeIcon from '@mui/icons-material/Home';
// import Button from '@mui/material/Button';


function DrinkDetails (){
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


    const goHome = () =>{
        history.push('/explore');
    }
   


    return(
        <>
        <p>{drink.name}</p>
        <input 
        className="btn" 
        type="submit" 
        name="submit" //why is submit impacting size?
        value="Back"   
        onClick={goHome}/>
        </>
        
    )
}

export default DrinkDetails;