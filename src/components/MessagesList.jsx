import { useEffect, useState, useRef } from 'react';
import { observer, useLocalObservable } from "mobx-react-lite";
import {toJS} from "mobx"
import { myUser } from '../store/User';
import { myMessage } from '../store/Message';
import Box from '@mui/material/Box';
import {Stack, Typography} from '@mui/material';
import ListItem from '@mui/material/ListItem';
import Message from './Message';
import { getDatabase, ref, onValue, remove } from "firebase/database";

const MessagesList = observer(() => {

  const [messages, setMessages] = useState();
  const divRef = useRef(null);

  
//   const user = useLocalObservable(() => myUser);
  const message = useLocalObservable(() => myMessage);
  const user = useLocalObservable(() => myUser);
  
  function fetchMessages() {
        const db = ref(getDatabase(), 'messages');
        onValue(db, (snapshot) => {
          const data = snapshot.val();
        setMessages(data)
        });
 };

//  const handleDeleteMessage = (messageId, date) => {
//     // const filtered = Object.keys(messages).map(mesDate => {
//     //   const messageIDs = messages[mesDate];
//     //   return Object.keys(messageIDs).map(message => {
//     //     // const {text, nick, id, name, createdAt, date} = messages[mesDate][message]
//     //     // console.log('messages[mesDate][message]: ', messages[mesDate][message]);
//     //     return messages[mesDate][message];
//     //     // .filter(item => item.id !== messageId)
//     //   }).filter(item => {
//     //     // console.log('messageId: ', item.id === messageId, item.id, messageId);  
//     //     return item.id !== messageId
//     //   })
//     // })
//     const db = ref(getDatabase(), `/messages/${date.replaceAll(".", "-")}/${messageId}`);
//     remove(db);
//     console.log(messageId, date.replaceAll(".", "-"))
//  }

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

  console.log("messages: ", messages);

  return (
        <Box sx={{
            flexGrow: 1,
            width: "100%",
            maxHeight: "85%",
            height: "fit-content",
            overflow: "auto",
            transform: "rotate(180deg)",
            transition: "filter 1s linear",
            }}>
            <Stack component="ul" spacing={2} sx={{
                display: "flex",
                padding: 0,
                flexDirection: "column-reverse",
                justifyContent: "flex-end",
                gap: 3,
                marginY: 0
            }}>
                    {messages ? Object.keys(messages).map(mesDate => {
                        const messageIDs = messages[mesDate];
                        // Date&time processing block - start 
                        const parts = mesDate.split('-');                        
                        const dateObj = new Date(parts[2], parts[1] - 1, parts[0]); // Месяцы в JS от 0 до 11
                        const dateOfMessage = dateObj.getDate();
                        const toDay = new Date(Date.now()).getDate();
                        function getWeekDay(date) {
                            let days = ['mon', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
                            return days[date.getDay()];
                        }
                        {/* console.log('messageIDs: ', dateOfMessage === toDay); */}
                        // Date&time processing block - end 
                        return (
                            <ListItem component="li" key={mesDate} sx={{display: "flex", flexDirection: "column-reverse", gap: 2, padding: 0}}>
                                <Typography color="info" component="h2" variant="h6" sx={{transform: "rotate(180deg)"}}>{dateOfMessage === toDay ? "today" : getWeekDay(dateObj)}, {mesDate.replaceAll("-", ".")}</Typography>
                                <Stack component="ul" sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    // transform: "rotate(180deg)",
                                    padding: 0,
                                    width: "100%",
                                    gap: 3
                                    }}>
                                    <ListItem component="li" sx={{display: "flex", flexDirection: "column-reverse", padding: 0, gap: 2}}>
                                        {Object.keys(messageIDs).map(message => {
                                            const {text, nick, id, name, createdAt, date, changed} = messages[mesDate][message]
                                            
                                            return (
                                              <Message
                                                  key={id}
                                                  nick={nick}
                                                  name={name}
                                                  id={id}
                                                  createdAt={createdAt}
                                                  text={text}
                                                  date={date}
                                                  changed={changed}
                                                  // handleDeleteMessage={handleDeleteMessage}
                                              />
                                            )
                                        })}     
                                   </ListItem>
                                </Stack>
                            </ListItem>
                        )
                        })
                    : null}
            </Stack>
            <h2>{myMessage.input}</h2>
        </Box>
    )
})

export default MessagesList;

