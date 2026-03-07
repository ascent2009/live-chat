import { useRef, useState } from 'react';
import { observer, useLocalObservable } from "mobx-react-lite";
import { myUser } from '../store/User';
import { myMessage } from '../store/Message';
import {Paper, keyframes} from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
// import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SimpleDialog from './DialogConfirm';
import EditInput from './EditInput';

const Message = observer(({nick, name, id, createdAt, date, text, changed}) => {
  
    const divRef = useRef(null);
    const message = useLocalObservable(() => myMessage);
    const user = useLocalObservable(() => myUser);
    const [contextMenu, setContextMenu] = useState(null);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleContextMenu = (event) => {
      event.preventDefault();

      setContextMenu(
        contextMenu === null
          ? {
              mouseX: event.clientX + 2,
              mouseY: event.clientY - 6,
            }
          : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
            // Other native context menus might behave different.
            // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
            null,
      );

      // Prevent text selection lost after opening the context menu on Safari and Firefox
      const selection = document.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);

        setTimeout(() => {
          selection.addRange(range);
        });
      }
    };

    const handleOpenDialog = () => {
      setOpen(!open);
    };

    const handleEdit = () => {
      setEdit(!edit);
      handleClose();
    };

    const handleClose = () => {
      setContextMenu(null);
    };


    const bounceInBottom = keyframes`
    0% {
      transform: translateZ(-1400px) translateY(-800px) rotate(180deg);
      opacity: 0;
    }
    100% {
      transform: translateZ(0) translateY(0) rotate(180deg);
      opacity: 1;
    }
 `;

    return (
      <>
        {/* <Avatar src={name === user.user.name ? user.user.avatar : null} sx={{transform: "rotate(180deg)", width: 32, height: 32 }}/> */}
        <Paper elevation={3} square={false} ref={divRef} key={id} sx={{
             display: "flex",
             flexDirection: "column",
             position: "relative",
             transform: "rotate(180deg)",
             width: "85%",
             padding: "10px 15px",
             borderRadius: "20px",
             borderTopLeftRadius: name === user.user.name && 0,
             borderBottomRightRadius: name !== user.user.name && 0,
             background: name === user.user.name ? "#b4cfe9ff" : "white",
             alignSelf: name === user.user.name ? "flex-start" : "flex-end",
             gap: 1.5,
             '&:last-child': {
             animation: message.animation && `${bounceInBottom} 0.7s both`,
             },
         }}
            onContextMenu={handleContextMenu}
         > 
             {name === user.user.name || <Typography color="success">{nick || name}</Typography>}
             <Typography component="h4" fontSize={16} color="secondary" sx={{
             wordBreak: "break-all"
             }}>
             {text}
             </Typography>
             {/* <Typography alignSelf="flex-end" color="action" fontSize={12}></Typography> */}
             <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: 'flex-end'
              }}>
              <Typography fontSize={12} color="success">{changed}</Typography>
              <Typography alignSelf="flex-end" color="primary" fontSize={12}>
                {createdAt}
              </Typography>
              
             </Box>
        </Paper>
        {contextMenu && 
          <Menu
            open={contextMenu !== null}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
              contextMenu !== null
                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                : undefined
            }
          >
            {name !== user.user.name ? null : <MenuItem onClick={handleEdit} sx={{display: "flex", gap: 1, alignItems: "center"}}><EditIcon color="action" />Edit message</MenuItem>}
            <MenuItem
              onClick={
              // () => {
              //   handleDeleteMessage(id, date)
              //   handleClose()
              //   }
                handleOpenDialog
              }
              sx={{display: "flex", gap: 1, alignItems: "center"}}><DeleteIcon color="action"
              />
                Delete message
            </MenuItem>
          </Menu>
        }
        {open && <SimpleDialog open={open} handleOpenDialog={handleOpenDialog} id={id} date={date} />}
        {edit && <EditInput handleEdit={handleEdit} handleOpenDialog={handleOpenDialog} id={id} date={date} text={text} createdAt={createdAt} />}
      </>
    )
})

export default Message;