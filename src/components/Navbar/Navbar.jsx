import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import healthIcon from '../../assets/publichealth.png'


export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1,marginBottom:'20px' }}>
      <AppBar position="static">
        <Toolbar> 
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,textAlign: 'center' }}>
            HealthCare
          <img src={healthIcon} alt="Healthcare" style={{marginLeft:'10px', placeItems:'center' 
          }} /> 
          </Typography>
         
        </Toolbar>
      </AppBar>
    </Box>
  );
}