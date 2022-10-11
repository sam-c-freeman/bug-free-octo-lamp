import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CssBaseline from '@mui/material/CssBaseline';
import ExploreIcon from '@mui/icons-material/Explore';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import { useState } from 'react';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';

function Navigation () {
    const [value, setValue] = useState('recents');
    const ref = useRef(null);
    const history = useHistory();


    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const goToHome = () =>{
        history.push('/home')
    }
  
    const goToAdd = () =>{
        history.push('/addDrink')
    }

    const goToExplore = () =>{
        history.push('/explore')
    }

    return (
        <Box sx={{ pb: 7 }} ref={ref}>
            <CssBaseline />
            <BottomNavigation 
                sx={{ width: 380, 
                    position: 'fixed', 
                    bottom: 0, 
                    left: 0, 
                    right: 0 }} 
                    style={{backgroundColor: "black"}}
                    value={value} 
                    onChange={handleChange}>
                        <BottomNavigationAction
                            onClick={goToHome}
                            label="Home"
                            style={{color: "#B8860B"}}
                            value="home"
                            icon={<HomeIcon  
                                    style={{color: "#B8860B"}}/>}
                        />
                        <BottomNavigationAction
                            onClick={goToAdd}
                            label="Add"
                            style={{color: "#B8860B"}}
                            value="add"
                            icon={<AddCircleIcon 
                                    style={{color: "#B8860B"}}/>}
                        />
                        <BottomNavigationAction
                            label="Favorites"
                            style={{color: "#B8860B"}}

                            value="favorites"
                            icon={<FavoriteIcon 
                                    style={{color: "#B8860B"}}/>}
                        />
                        <BottomNavigationAction 
                            label="Explore" 
                            style={{color: "#B8860B"}}
                            onClick={goToExplore}
                            value="explore" 
                            icon={<ExploreIcon 
                                    style={{color: "#B8860B"}}/>} 
                        />
                        <BottomNavigationAction 
                            label="Pantry"
                            style={{color: "#B8860B"}} 
                            value="pantry" 
                            icon={<LocalBarIcon 
                                    style={{color: "#B8860B"}}/>} 
                        />
            </BottomNavigation>
                    
      </Box>
    );
}

export default Navigation