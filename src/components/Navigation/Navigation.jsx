import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CssBaseline from '@mui/material/CssBaseline';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
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
                    label="Recents"
                    value="recents"
                    icon={<RestoreIcon />}
                />
                <BottomNavigationAction
                    label="Favorites"
                    value="favorites"
                    icon={<FavoriteIcon />}
                />
                <BottomNavigationAction
                    label="Nearby"
                    value="nearby"
                    icon={<LocationOnIcon />}
                />
                <BottomNavigationAction 
                    label="Folder" 
                    value="folder" 
                    icon={<FolderIcon />} 
                />
                  <BottomNavigationAction 
                    label="home" 
                    value="home" 
                    icon={<HomeIcon />} 
                />
                </BottomNavigation>
                
      </Box>
    );
}

export default Navigation