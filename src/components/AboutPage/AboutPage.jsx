import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';  


import CardContent from '@mui/material/CardContent';

function AboutPage() {
  return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
    >
      <Grid item xs={12} sx={{mt: 1}}>
        <Card sx={{maxWidth: 345, minWidth: 345}}>
            <CardContent>
            <Box
                display="flex"
                justifyContent="center">
                <Typography gutterBottom variant="h4" component="div">
                    About
                </Typography>
            </Box>
                <Typography gutterBottom variant="h6" component="div" sx={{mt: 1}}>
                    Technologies Used
                </Typography>
                <ul>
                  <li>
                <Typography gutterBottom variant="body1" component="div">
                   Javascript
                </Typography>
                  </li> 
                <li>
                <Typography gutterBottom variant="body1" component="div">
                   React
                </Typography>
                  </li>
                  <li>
                <Typography gutterBottom variant="body1" component="div">
                   Redux
                </Typography>
                  </li>
                  <li>
                <Typography gutterBottom variant="body1" component="div">
                   Saga
                </Typography>
                  </li>
                  <li>
                <Typography gutterBottom variant="body1" component="div">
                   Node.js
                </Typography>
                  </li>
                  <li>
                <Typography gutterBottom variant="body1" component="div" >
                   Express
                </Typography>
                  </li>
                  <li>
                <Typography gutterBottom variant="body1" component="div" >
                   PostgreSQL
                </Typography>
                  </li>
                  <li>
                <Typography gutterBottom variant="body1" component="div">
                   Material UI
                </Typography>
                  </li>
                  <li>
                  <Typography gutterBottom variant="body1" component="div">
                    Passport
                  </Typography>
                  
                  </li>
                  <li>
                <Typography gutterBottom variant="body1" component="div" >
                   Cloudinary
                </Typography>
                  </li>
                </ul> 

                <Typography gutterBottom variant="h6" component="div">
                  Future Plans 
                </Typography>
                <ul>
                <li>
                <Typography gutterBottom variant="body1" component="div" >
                   Add search functionality
                </Typography>
                  </li>
                  <li>
                <Typography gutterBottom variant="body1" component="div" >
                   Add the ability to rank/review recipes
                </Typography>
                  </li>
                  <li>
                <Typography gutterBottom variant="body1" component="div" >
                   Sharing recipes 
                </Typography>
                  </li>
                </ul> 
               
            
                
         
                <Typography gutterBottom variant="h6" component="div" sx={{mt: 2}}>
                  Thanks  
                </Typography>
                <Typography gutterBottom variant="body1" component="div" sx={{mt: 2}}>
                  Thank you to my family, friends, the L'Engle cohort, Prime Digital Academy
                   and <strong>especially</strong> Matt for helping make
                  this project and this program a reality.  
                </Typography>
                
                
            </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AboutPage;
