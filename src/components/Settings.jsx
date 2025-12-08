import { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import {FormGroup, FormHelperText, TextField} from '@mui/material';
import { useParams, useNavigate } from "react-router";
import { observer, useLocalObservable  } from "mobx-react-lite";
import { myUser } from '../store/User';


 const Settings = observer(() => {
    let params = useParams();
    // console.log('params: ', params);
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const [nickName, setNickName] = useState("");
    const [error, setError] = useState("");
    const user = useLocalObservable(() => myUser);

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);
        
    }

    const handleNickName = async(e) => {
        e.preventDefault();
        if (!input) return setError("Please enter your nickname");
        try {
            setError("");
            setNickName(input)
            user.setNickName(input);
        } catch(err) {
            setError(err.message);
        }
        setInput("");
    }
    
    return (
        <Container>
            <Box>Change profile name:
              <Typography>{nickName ? user.user.nickname : user.user.name}</Typography>
            </Box>
            <FormGroup as="form" onSubmit={handleNickName}>
                <TextField type="text" defaultValue={input} placeholder="Put your nickname" onChange={handleChange} />
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
                <Button variant="contained" type="submit">Save</Button>
            </FormGroup>
            
            <Button variant="contained"
            // href={`/user/${params.id}`}
            onClick={() => navigate(`/user/${params.id}`)}
            >Back to Main</Button>
        </Container>
    )
})

export default Settings;