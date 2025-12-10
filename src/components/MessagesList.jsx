import { useEffect, useState, useRef } from 'react';
import { observer, useLocalObservable } from "mobx-react-lite";
// import { myUser } from '../store/User';
// import { myMessage } from '../store/Message';
import Box from '@mui/material/Box';
import {Stack} from '@mui/material';
import Typography from '@mui/material/Typography';
import Message from './Message';
import { getDatabase, ref, onValue } from "firebase/database";

const MessagesList = observer(() => {

  const [messages, setMessages] = useState(([]))
  const divRef = useRef(null);

  
//   const user = useLocalObservable(() => myUser);
//   const message = useLocalObservable(() => myMessage);
  
  function fetchMessages() {
        const db = ref(getDatabase(), 'messages');
        onValue(db, (snapshot) => {
          const data = snapshot.val();
          const obj = Object.keys(data)
            .map((sn) =>  {
              const sub = data[sn];
              return Object.keys(sub)
                .map(s => sub[s])
                }
            ).flat()
            .sort((a, b) => a["id"] - b["id"]);
          setMessages(obj)  
        });
 };

  useEffect(() => {
    try {
      fetchMessages();

      if (divRef && divRef.current)
        divRef.current.scrollIntoView(
          {
            behavior: 'smooth',
            block: 'start'
          }
      );

    } catch (err) {
      console.log('err: ', err.message);
    } 
  }, []);

  console.log(messages);
    return (
        <Box sx={{
            flexGrow: 1,
            width: "100%",
            maxHeight: "85%",
            height: "fit-content",
            overflow: "auto",
            transform: "rotate(180deg)",
            transition: "filter 1s linear",
            // filter: "blur(2px)",
            }}>
            <Stack spacing={2} sx={{
                display: "flex",
                flexDirection: "column-reverse",
                justifyContent: "flex-end",
                }}>
                 <Message messages={messages}/>
            </Stack>
        </Box>
    )
})

export default MessagesList;

