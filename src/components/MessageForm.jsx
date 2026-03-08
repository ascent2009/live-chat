import { useState, useRef } from 'react';
import { FormGroup, FormControl, InputLabel, Input, FormHelperText, IconButton } from "@mui/material"
import { myMessage } from '../store/Message';
import Box from "@mui/material/Box"
import { myUser } from '../store/User';
import { observer, useLocalObservable } from "mobx-react-lite";
import { getDatabase, ref, set } from "firebase/database";
import SendIcon from '@mui/icons-material/Send';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AttachFileIcon from '@mui/icons-material/AttachFile';


const MessageForm = observer(() => {
    const fileInputRef = useRef(null);
    const [input, setInput] = useState("");
    const [file, setFile] = useState("");
    const [error, setError] = useState("");
    const message = useLocalObservable(() => myMessage);
    const user = useLocalObservable(() => myUser);
    const [showEmoji, setShowEmoji] = useState(false);
    
    const handleChange = (e) => {
        setInput(e.target.value);
        setError("");
    }

    const handleEmojiSelect = (emoji) => {
    // Вставка эмодзи в текущую позицию текста
        setInput(prev => prev + emoji.native); 
    };

    const handleShowEmoji = () => {
        setShowEmoji(!showEmoji)
    }

    const handleFileChange = (event) => {
        const files = event.target.files; // Получаем FileList
        console.log('files: ', files);
        if (files.length > 0) {
        // Берем первый файл
        const fileSelect = files[0];
        setFile(fileSelect);
        console.log("Выбран файл:", fileSelect.name, fileSelect.size, fileSelect.type);
        setInput(prev => prev + file);
    }
  };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey && "form" in e.target) {
            e.preventDefault();
            e.target.form.requestSubmit();
            setShowEmoji(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        if (!input) return setError("Please enter a valid text");
        try {
            
            message.setMessage = {
                name: user.user.name,
                nick: user.user.nickname,
                id: new Date().getTime(),
                text: input,
                createdAt: new Date().toLocaleTimeString(),
                date: new Date().toLocaleDateString()
            };
            set(ref(getDatabase(), `messages/${new Date().toLocaleDateString().replaceAll(".", "-")}/${message.message.id}`), message.message);
            myMessage.setAnimation = true;
            setInput("");
            setShowEmoji(false);
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
                borderRadius: "10px",
                maxHeight: "57px",
                position: "relative"
                }}>
            <Box sx={{flexGrow: 1, display: "flex", alignItems: "center", gap: "0.5rem"}}>
                <SentimentSatisfiedAltIcon onClick={handleShowEmoji} color="primary" />
                <AttachFileIcon
                    onChange={handleFileChange}
                    onClick={() => fileInputRef.current.click()}
                    color="primary"
                    sx={{transform: "rotate(45deg)"}}
                />
                <Input 
                    type="file"
                    multiple 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    sx={{ display: 'none' }} 
                />
                <Box sx={{position: "absolute", bottom: "120%", right: "0"}}>
                    {showEmoji && <Picker data={data} onEmojiSelect={handleEmojiSelect} />}
                </Box>
                <Input multiline disableUnderline={true} id="my-input" aria-describedby="my-helper-text" value={input} onChange={handleChange} sx={{
                        width: "100%",
                        outline: "none",
                        padding: 0,
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

