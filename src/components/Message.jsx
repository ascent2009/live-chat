import { useRef } from 'react';
import { observer, useLocalObservable } from "mobx-react-lite";
import { myUser } from '../store/User';
import { myMessage } from '../store/Message';
import {Paper, keyframes} from '@mui/material';
import Typography from '@mui/material/Typography';

const Message = observer(({nick, name, id, createdAt, text}) => {

    const divRef = useRef(null);
    const message = useLocalObservable(() => myMessage);
    const user = useLocalObservable(() => myUser);

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
         }}> 
             {name === user.user.name || <Typography color="success">{nick || name}</Typography>}
             <Typography component="h4" fontSize={16} color="secondary" sx={{
             wordBreak: "break-all"
             }}>
             {text}
             </Typography>
             <Typography alignSelf="flex-end" color="primary" fontSize={12}>{createdAt}</Typography>
        </Paper>
       
    )
})

export default Message;