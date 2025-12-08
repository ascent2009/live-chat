import { useEffect, useState, useRef } from 'react';
import { observer, useLocalObservable } from "mobx-react-lite";
import { myUser } from '../store/User';
import { myMessage } from '../store/Message';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {Stack, Paper, keyframes} from '@mui/material';
import Typography from '@mui/material/Typography';
import Header from './Header';
import SideList from './SideList';
import MessageForm from './MessageForm';
import { redirect, useParams, useNavigate } from 'react-router';
import { getDatabase, ref, onValue } from "firebase/database";
// import {toJS} from 'mobx';

const UserPage = observer(() => {
  const navigate = useNavigate();
  let params = useParams();
  const [messages, setMessages] = useState(([]))
  const divRef = useRef(null);

  
  const user = useLocalObservable(() => myUser);
  const message = useLocalObservable(() => myMessage);
  
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

      
 
  useEffect(() => {
    try {
      if (!user.user.isAuthenticated) {
        navigate('/')
      }
      user.fetchUser(`users/${params.id}`)
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
      throw redirect("/");
    } 
  }, []);

  console.log(messages);

  return (
    <Container maxWidth="sm" sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100vw',
      height: '100vh'
    }}>
    <Header />
    <SideList params={params.id}/>
    
    <Box
      ref={divRef}
      component="section"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: "transparent",
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
        flexDirection: "column",
        height: "90%",
      }}
    >
      <Box sx={{
          flexGrow: 1,
          width: "100%",
          maxHeight: "85%",
          overflow: "auto",
          transform: "rotate(180deg)",
        }}>
        <Stack spacing={2} sx={{
              display: "flex",
              flexDirection: "column-reverse",
              justifyContent: "flex-end",
              }}>
        {messages.map(({nick, name, id, createdAt, text}) => {
          
          return (
              <Paper ref={divRef} key={id} sx={{
                position: "relative",
                transform: "rotate(180deg)",
                width: "85%",
                padding: "10px 15px",
                borderRadius: "20px",
                background: name === user.user.name ? "#b4cfe9ff" : "white",
                alignSelf: name === user.user.name ? "flex-start" : "flex-end",
                '&:last-child': {
                  animation: message.animation && `${bounceInBottom} 0.7s both`,
                },
              }}> 
                <Typography color="success">{nick || name}</Typography>
                <Typography component="h4" color="secondary" sx={{
                  wordBreak: "break-all"
                }}>
                  {text}
                </Typography>
                <Typography color="primary">{createdAt}</Typography>
              </Paper>
            
          )
        })}
        </Stack>
      </Box>
      <MessageForm params={params.id} />
    </Box>
    </Container>
  );
});

export default UserPage;



