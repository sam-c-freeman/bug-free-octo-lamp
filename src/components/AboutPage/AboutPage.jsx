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
                <Typography gutterBottom variant="body1" component="div" sx={{mt: 1}}>
                   Javascript
                </Typography>
                  </li> 
                <li>
                <Typography gutterBottom variant="body1" component="div" sx={{mt: 1}}>
                   React
                </Typography>
                  </li>
                  <li>
                <Typography gutterBottom variant="body1" component="div" sx={{mt: 1}}>
                   Redux
                </Typography>
                  </li>
                  <li>
                <Typography gutterBottom variant="body1" component="div" sx={{mt: 1}}>
                   Saga
                </Typography>
                  </li>
                  <li>
                <Typography gutterBottom variant="body1" component="div" sx={{mt: 1}}>
                   Node.js
                </Typography>
                  </li>
                  <li>
                <Typography gutterBottom variant="body1" component="div" sx={{mt: 1}}>
                   Express
                </Typography>
                  </li>
                  <li>
                <Typography gutterBottom variant="body1" component="div" sx={{mt: 1}}>
                   PostgreSQL
                </Typography>
                  </li>
                  <li>
                <Typography gutterBottom variant="body1" component="div" sx={{mt: 1}}>
                   Material UI
                </Typography>
                  </li>
                  <li>
                  <Typography gutterBottom variant="body1" component="div" sx={{mt: 1}}>
                    Passport
                  </Typography>
                  
                  </li>
                  <li>
                <Typography gutterBottom variant="body1" component="div" sx={{mt: 1}}>
                   Cloudinary
                </Typography>
                  </li>
                </ul>         
            </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AboutPage;
