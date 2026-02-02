import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { red } from '@mui/material/colors';
import { myMessage } from '../store/Message';
import { observer, useLocalObservable } from "mobx-react-lite";

const SimpleDialog = observer((props) => {
  const { open, handleOpenDialog, id, date } = props;
  const color = red[500];
  const message = useLocalObservable(() => myMessage);
  
  return (
    <Dialog open={open} onClose={handleOpenDialog}>
      <DialogTitle>Confirm?</DialogTitle>
        <Box sx={{display: "flex", justifyContent:"space-around", pb: 2}}>
          <CheckIcon color="success" onClick={() => {message.handleDeleteMessage(id, date)}}/>
          <ClearIcon sx={{color: color, fontWeight: "900", cursor: "pointer"}} onClick={handleOpenDialog} />
        </Box>
    </Dialog>
  );
})

export default SimpleDialog;
