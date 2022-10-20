import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="containerHome">
         <Grid 
          container spacing={2}
          alignItems="center">
           <Grid item
            container
            direction="column"
            justify="center"
            alignItems="center" 
            xs={12}>
              <h2 className="dailyDrink">Welcome, {user.username}!</h2>
          </Grid>
      {/* <Box sx={{ flexGrow: 1 }}> */}
     
            <Grid item
            container
            direction="column"
            justify="center"
            alignItems="center"
            sx={{mt: 3}} 
            xs={12}>
              <img src="images/cocktailhome.jpg"></img>
            </Grid>
          </Grid>
    {/* </Box> */}
     
      {/* <LogOutButton className="btn" /> */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;


