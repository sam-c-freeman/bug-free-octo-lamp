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

function Navigation () {
    const [value, setValue] = useState('recents');
    const ref = useRef(null);


    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
        <Box sx={{ pb: 7 }} ref={ref}>
            <CssBaseline />
            <BottomNavigation sx={{ width: 380, position: 'fixed', bottom: 0, left: 0, right: 0 }} value={value} onChange={handleChange}>
                <BottomNavigationAction
                    label="Home"
                    value="home"
                    icon={<HomeIcon />}
                />
                <BottomNavigationAction
                    label="Add"
                    value="add"
                    icon={<AddCircleIcon />}
                />
                <BottomNavigationAction
                    label="Favorites"
                    value="favorites"
                    icon={<FavoriteIcon />}
                />
                <BottomNavigationAction 
                    label="Explore" 
                    value="explore" 
                    icon={<ExploreIcon />} 
                />
                  <BottomNavigationAction 
                    label="Pantry" 
                    value="pantry" 
                    icon={<LocalBarIcon />} 
                />
                </BottomNavigation>
                
      </Box>
    );
}

export default Navigation