import { useState } from "react";
import { FormGroup, FormControl, InputLabel, Input, FormHelperText, IconButton } from "@mui/material"
import SimpleDialog from './DialogConfirm';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { getDatabase, ref, update } from "firebase/database";
import { observer, useLocalObservable } from "mobx-react-lite";
import { myMessage } from '../store/Message';
import { myUser } from '../store/User';

const EditInput = observer(({text, id, date, handleEdit}) => {
    
    // const message = useLocalObservable(() => myMessage);
    // const user = useLocalObservable(() => myUser);
    const [input, setInput] = useState("");
    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = (e) => {
            e.preventDefault();
            handleEdit();
            const db = ref(getDatabase(), `/messages/${date.replaceAll(".", "-")}/${id}`);
            update(db, {
                 text: input, // A timestamp value
                 changed: "changed"
            });
    }

    return (
        <>
            <FormGroup as="form"
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    width: "85%",
                    alignItems: "center",
                    background: "rgb(230, 226, 226)",
                    padding: "10px",
                    border: "1px solid #1976d2",
                    borderRadius: "10px",
                    minHeight: "70px",
                    height: "fit-content",
                    position: "relative",
                    transform: "rotate(180deg)",
                    top: 30,
                    right: 10,
                    zIndex: 2
                }}
                onSubmit={handleSubmit}
            >
                <Input multiline disableUnderline={true} id="my-input" aria-describedby="my-helper-text"
                    value={input || text} onChange={handleChange}
                    sx={{
                            width: "100%",
                            outline: "none",
                            p: 0,
                            pr: "30px"
                    }}
                />
                <CloseIcon color="action"
                    sx={{
                        position: "absolute",
                        right: 7,
                        top: 7,
                    }}
                    onClick={handleEdit}
                />
                <CheckIcon
                    type="submit" 
                    sx={{
                        position: "absolute",
                        right: 3,
                        bottom: 6,
                        margin: 0.5,
                        background: "#0288d1",
                        borderRadius: "50%",
                        color: "#ffff"
                    }}
                    onClick={handleSubmit}
                />
            </FormGroup>
            <SimpleDialog />
        </>
    )
})

export default EditInput;
