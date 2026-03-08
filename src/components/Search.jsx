import {useState} from 'react'
import { observer, useLocalObservable } from "mobx-react-lite";
import {toJS} from 'mobx'
import { myMessage } from '../store/Message';
import { FormGroup, FormControl, InputLabel, Input, FormHelperText, IconButton } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box"

const Search =  observer(() =>{
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const message = useLocalObservable(() => myMessage);
    
    const handleChange = (e) => {
        setInput(e.target.value);
        setError("");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        message.setInput = input;
        console.log("search: ", message.input); 
    }
    
    return (
        <FormGroup as="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "row",
                margin: "10px",
                alignItems: "center",
                background: "#f5dcdcff",
                paddingX: "10px",
                border: "1px solid #1976d2",
                borderRadius: "10px",
            }}>
            <Box sx={{flexGrow: 1}}>
                <Input disableUnderline={true} id="my-input" aria-describedby="my-helper-text" value={input} onChange={handleChange} sx={{
                        width: "100%",
                        outline: "none",
                        padding: 0,
                    }}
                    placeholder="search in messages..."
                />
                {error && <FormHelperText sx={{
                            fontSize: 14,
                            textAlign: "center",
                            color: "red",
                }}>
                    {error}
                </FormHelperText>}
            </Box>
            
            <IconButton color="primary" type="submit" aria-label="search" sx={{
                padding: 0
            }}>
                <SearchIcon 
                    fontSize="small"
                 />
            </IconButton>
        </FormGroup>
    )
})

export default Search;