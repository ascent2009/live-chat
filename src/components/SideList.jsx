import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { observer, useLocalObservable  } from "mobx-react-lite";
import { toJS } from 'mobx';
import { myUser } from '../store/User';
import { Link } from "react-router";
import Search from './Search';
import { Divider } from '@mui/material';


const SideList = observer(({params}) => {
    const [openSide, setOpenSide] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [placement, setPlacement] = React.useState();
    const chats = useLocalObservable(() => myUser)
      
    const handleClick = (newPlacement) => (event) => {
      setAnchorEl(event.currentTarget);
      setOpenSide((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  return (
    <Box>
      <Popper
        // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
        sx={{ zIndex: 1200, margin: "5px" }}
        open={openSide}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper component="ul" sx={{
              listStyle: 'none',
              padding: 0,
              paddingTop: 0.1
            }}>
              <Search />
              <Divider />
              <Typography color='secondary' variant='h5' sx={{ p: 4 }}>Chats & Contacts</Typography>
                
                {toJS(chats.users)[0].map(({id, nickname, name, avatar}, index) => {
                  const url = `/user/${id}`
                  
                  return (
                      <Box component="li" sx={{ p: 4, pt: 0, display: "flex", gap: 7, alignItems: "center", mr: "30px" }} key={index}>
                        <Link href={id !== params && url} target="_blank"
                          style={{
                            pointerEvents: id === params && "none",
                            opacity: id === params && 0.3,
                            display: "flex",
                            alignItems: "center",
                            gap: 50
                          }}
                          onClick={chats.setAuthenticate = "true"}>
                          <Avatar src={avatar} />
                          {nickname || name}
                        </Link>
                        {id === params ? <Badge color="success" badgeContent="now active" sx={{"& span": {p:2}}} /> : null}
                      </Box>
                  )
                })}
            </Paper>
          </Fade>
        )}
      </Popper>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid>
            <Tooltip title="Show all chats">
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
        </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
});

export default React.memo(SideList);
