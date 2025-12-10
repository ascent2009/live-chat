import { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, FormHelperText, IconButton } from "@mui/material"
import { myMessage } from '../store/Message';
import Box from "@mui/material/Box"
import { myUser } from '../store/User';
import { observer, useLocalObservable } from "mobx-react-lite";
import { getDatabase, ref, set } from "firebase/database";
import SendIcon from '@mui/icons-material/Send';

const MessageForm = observer(({params}) => {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const message = useLocalObservable(() => myMessage);
    const user = useLocalObservable(() => myUser);
    
    const handleChange = (e) => {
        setInput(e.target.value);
        setError("");
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey && "form" in e.target) {
            e.preventDefault();
            e.target.form.requestSubmit();
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
    // const writeMessage = () => {
    //     user.setUserID = uuidv4();
    //     user.setUserName(phone);
    //     user.setAuthenticate = true;
    //     const obj = {
    //         id: user.user.id,
    //         name: user.user.name,
    //         nickname: user.user.nickname,
    //         isAuthenticated: user.user.isAuthenticated
    //     }
    //     console.log(obj);
    //     set(ref(getDatabase(), `users/${user.user.id}`), obj);
    // }
        
        if (!input) return setError("Please enter a valid text");
        // let countID = 0;
        try {
            message.setMessage = {
                name: user.user.name,
                nick: user.user.nickname,
                // id: params,
                // id: parseInt(Math.random() * 1000),
                id: new Date().getTime(),
                text: input,
                createdAt: new Date().toLocaleTimeString()
            };
            set(ref(getDatabase(), `messages/${params}/${message.message.id}`), message.message);
            // message.postMessage(message.message.id)
            // console.log(message.messages);
            myMessage.setAnimation = true;
            setInput("");
        } catch(err) {
            setError(err.message);
        }
        
    }

    return (
        <FormGroup as="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                width: "100%",
                alignItems: "center",
                background: "#f5dcdcff",
                padding: "10px",
                border: "1px solid #1976d2",
                borderRadius: "10px"
            }}>
            <Box sx={{flexGrow: 1}}>
                <Input multiline id="my-input" aria-describedby="my-helper-text" value={input} onChange={handleChange} sx={{
                        width: "100%",
                        outline: "none",
                        padding: 0,
                        '.css-1u90fv-MuiInputBase-root-MuiInput-root:hover:not::active': {
                            borderBottom: "none"
                        }
                    }}
                    onKeyDown={handleKeyDown}
                />
                {error && <FormHelperText sx={{
                            fontSize: 14,
                            textAlign: "center",
                            color: "red",
                }}>
                    {error}
                </FormHelperText>}
            </Box>
            
            <IconButton color="primary" type="submit" aria-label="send message" sx={{
                padding: 0
            }}>
                <SendIcon fontSize="large" />
            </IconButton>
        </FormGroup>
    )
})

export default MessageForm;

