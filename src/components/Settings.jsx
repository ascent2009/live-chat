import { useState, useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import {FormGroup, FormHelperText, TextField} from '@mui/material';
import { useParams, useNavigate } from "react-router";
import { observer, useLocalObservable  } from "mobx-react-lite";
import { myUser } from '../store/User';
import ModalAlias from './Modal';
import { getDatabase, ref, set } from "firebase/database";

const Settings = observer(() => {
    let params = useParams();

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const user = useLocalObservable(() => myUser);
    const [open, setOpen] = useState(false);
    
    const openModal = (e) => {
        e.preventDefault();
        setOpen(true);
    }

    const changeUserData = () => {
        const obj = {
            id: user.user.id,
            name: user.user.name,
            nickname: user.user.nickname,
            isAuthenticated: user.user.isAuthenticated,
            avatar: user.user.avatar
        }
        console.log(obj);
        set(ref(getDatabase(), `users/${user.user.id}`), obj);
    }

    const handleSubmit = (e, val, fn) => {
        e.preventDefault();
        setError("");
        if (!val) return setError("Please enter a valid text");
        
        try {
            user.setNickName = val;
            fn();
            changeUserData()
        } catch(err) {
            setError(err.message);
        }
    }

    return (
        <Container maxWidth="xl"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                height: '100vh'
            }}
        >
            <Box spacing={2}>
                <Typography variant="h6" color="primary">Your registered phone number:</Typography>
                <Typography variant="h5" align='center' color="success" fontWeight={700}>{user.user.name}</Typography>
            </Box>
            <Box spacing={2}>
                <Typography variant="h6" align='center' color="primary">Your current nickname:</Typography>
                <Typography variant="h5" align='center' color="success" fontWeight={700}>{user.user.nickname || <Typography color="warning">You haven't registered a nickname yet</Typography>}</Typography>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: 'column',
                alignItems: "center"
                }}
            >
                <Typography variant="h6" align='center' color="primary">Your current avatar:</Typography>
                 {<Avatar sx={{ width: 70, height: 70 }} src={user.user.avatar} alt="avatar" /> || <Typography align='center' color="warning">You have no avatar yet</Typography>}
            </Box>

            <FormGroup as="form" onSubmit={openModal}>
                <Button variant="contained" type="submit" onClick={openModal}>Change avatar or nickname</Button>
            </FormGroup>
            {open ? <ModalAlias open={open} setOpen={setOpen} handleSubmit={handleSubmit} error={error} />  : null}
            <Button variant="contained"
            onClick={() => navigate(`/user/${params.id}`)}
            >Back to Main</Button>
        </Container>
    )
})

export default Settings;