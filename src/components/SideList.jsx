

import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import {users} from '../users'

export default function SideList() {
    // const [ open, setOpen ] = React.useState(false);    
    const [openSide, setOpenSide] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [placement, setPlacement] = React.useState();
  
  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpenSide((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  return (
    <Box sx={{ width: 500 }}>
      <Popper
        // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
        sx={{ zIndex: 1200 }}
        open={openSide}
        anchorEl={anchorEl}
        placement={placement}
        transition
        
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
                <Typography color='secondary' component='h2' sx={{ p: 4 }}>Chats</Typography>
                <Typography sx={{ p: 2 }}>{users[0].name}</Typography>
                <Typography sx={{ p: 2 }}>{users[1].name}</Typography>
                <Typography sx={{ p: 2 }}>{users[0].name}</Typography>
                <Typography sx={{ p: 2 }}>{users[2].name}</Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid>
            {/* <Button onClick={handleClick('right')}>{users[0].name}<br/>{users[1].name}<br/>{users[2].name}</Button> */}
            <IconButton onClick={handleClick('right')} sx={
            {
                display: 'flex',
                width: 70,
                height: 70,
                outline: 'none',
                position: 'absolute',
                top: '50%',
                left: -30,
                borderRadius: '50%',
                bgcolor: 'primary.light',
                opacity: 0.5,
                '&:hover': {
                    bgcolor: 'primary.dark',
                    left: 0,
                },
                '&:active': {
                    left: 0,
                    opacity: 1,
                }
          }
          }
        >
            {openSide ? <KeyboardDoubleArrowLeftIcon color="primary.dark" fontSize="large" />
            :
            <KeyboardDoubleArrowRightIcon color="primary.dark" fontSize="large" />}
            
        </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}
