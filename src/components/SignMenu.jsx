import * as React from 'react';
import { Link } from "react-router";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { observer, useLocalObservable  } from "mobx-react-lite";
import { myUser } from '../mobx'


const SignMenu = observer(() => {
  const isAuthenticated = useLocalObservable(() => myUser)
  

  return (
    
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <IconButton variant="contained" {...bindTrigger(popupState)}>
            {isAuthenticated ? <Badge color="success" variant="dot" w="md">    
              <PermIdentityIcon color="primary" fontSize="large" />
            </Badge> : null }
          </IconButton>
          
          
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}><Link to="/profile/" style={{display: 'flex', alignItems: 'center', gap: 5}}><ManageAccountsIcon/>Settings</Link></MenuItem>
            <MenuItem onClick={() => {popupState.close; isAuthenticated.signOut}}><Link to='/' style={{display: 'flex', alignItems: 'center', gap: 5}}><LogoutIcon />Sign-out</Link></MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
    
  );
})

export default SignMenu;