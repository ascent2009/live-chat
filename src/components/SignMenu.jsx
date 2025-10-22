import * as React from 'react';
import { Link } from "react-router";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

export default function SignMenu() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <IconButton variant="contained" {...bindTrigger(popupState)}>
            <PermIdentityIcon color="primary" fontSize="large"/>
          </IconButton>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}><Link to='/login'>Sign-in</Link></MenuItem>
            <MenuItem onClick={popupState.close}><Link to='/welcome'>Sign-out</Link></MenuItem>
            {/* <MenuItem onClick={popupState.close}>Logout</MenuItem> */}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
