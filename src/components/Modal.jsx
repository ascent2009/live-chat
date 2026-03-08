import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FormGroup, FormHelperText, FormLabel, TextField  } from '@mui/material';
import { observer, useLocalObservable } from "mobx-react-lite";
import { myUser } from '../store/User';
import AvatarUpload from './AvatarUpload';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column"
};

const ModalAlias = observer(({open, setOpen, handleSubmit, error}) => {

  const user = useLocalObservable(() => myUser);
  const handleClose = () => setOpen(false);
  const [input, setInput] = useState("");
  
  const handleChange = (e) => {
    setInput(e.target.value);
  }
  
  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormGroup as="form" onSubmit={(e) => handleSubmit(e, input, handleClose)}  sx={{
                display: "flex",
                flexDirection: "column",
                height: 'fitContent',
                gap: 4,
                background: "transparent",
                alignItems: "center"
            }}>
                <FormLabel>Choose a nickname</FormLabel>
                <TextField
                    type="text"
                    onChange={handleChange}
                    placeholder="Enter your nick"
                    value={input}
                    sx={{
                        '& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input': {
                            textAlign: 'center',
                            fontSize: '20px',
                            color: '#4c4040de',
                            background: '#ffff'
                        }
                    }} 
                />
                <Box sx={{
                    height: 20,
                    mt: -4,
                }}>
                    {error && <FormHelperText sx={{
                        fontSize: 14,
                        textAlign: "center",
                        color: "red"
                    }}>{error}</FormHelperText>}
                </Box>
                <AvatarUpload />
                <Button variant="contained" color="secondary" type="submit">
                    Save
                </Button>
            </FormGroup>
            <Button variant="text" color="secondary" type="button" onClick={handleClose}>
               Cancel
            </Button>
        </Box>
      </Modal>
    </div>
  );
})


export default ModalAlias;