import * as React from 'react';
import { Link } from "react-router";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { observer, useLocalObservable  } from "mobx-react-lite";
import { myUser } from '../store/User';
import { useParams } from 'react-router';


const SignMenu = observer(() => {
  const user = useLocalObservable(() => myUser)
  let params = useParams();
  const badgeContent = user.user.nickname || user.user.name;
  
  console.log('nick> av: ', user.user.nickname);
  
  return (
    
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          
            <IconButton variant="contained" {...bindTrigger(popupState)}>
              {user.user.isAuthenticated ? 
                <Tooltip title={`${user.user.nickname} ${user.user.name}`} arrow><Badge color="success" badgeContent={badgeContent.length > 6 ? badgeContent.slice(0,6) + "..." : badgeContent} w="md"
                  anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}>    
                  {user.user.nickname 
                  ? <Avatar src={user.user.avatar} alt="avatar">{user.user.nickname[0].toUpperCase()}</Avatar>
                  : <PermIdentityIcon color="primary" fontSize="large" />}
                </Badge>
                </Tooltip>
                : null }
                
            </IconButton>
            
            <Menu {...bindMenu(popupState)}>
              <MenuItem onClick={popupState.close}><Link to={`/profile/${params.id}`} style={{display: 'flex', alignItems: 'center', gap: 5}}><ManageAccountsIcon/>Settings</Link></MenuItem>
              <MenuItem onClick={() => {popupState.close; user.signOut}}><Link to='/' style={{display: 'flex', alignItems: 'center', gap: 5}}><LogoutIcon />Sign-out</Link></MenuItem>
            </Menu>
          
        </React.Fragment>
      )}
    </PopupState>
    
  );
})

export default SignMenu;