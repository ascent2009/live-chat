import { useState, useRef } from 'react';
import { FormGroup, FormHelperText, FormLabel, TextField, Input  } from '@mui/material';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { observer, useLocalObservable } from "mobx-react-lite";
import { myUser } from '../store/User';
import AvatarImage from './AvatarImage';

const AvatarUpload = observer(() => {
  const [avatar, setAvatar] = useState(null); // Ссылка для предпросмотра
  const fileInputRef = useRef(null);
  const user = useLocalObservable(() => myUser);

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Read the file as a data URL
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
        user.setAvatar = reader.result;
      };
      reader.readAsDataURL(file);
      console.log('reader: ', user.user.avatar);
    }
  };

  return (
    <>
      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: 'pointer'}}>
        <Avatar 
          src={avatar} 
          alt="Avatar" 
          onClick={() => fileInputRef.current.click()}
        />
        <FormLabel component="label">Choose an avatar (optional) </FormLabel>
        <Input 
              type="file" 
              inputRef={fileInputRef} 
              onChange={handleAvatarChange} 
              accept="image/*" 
              sx={{ display: 'none' }} 
        />
      </Box>
    </>
  );
});

export default AvatarUpload;

