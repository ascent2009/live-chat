import { useEffect } from 'react';
import { observer, useLocalObservable } from "mobx-react-lite";
import { myUser } from '../store/User';
// import { myMessage } from '../store/Message';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Header from './Header';
import SideList from './SideList';
import MessageForm from './MessageForm';
import MessagesList from './MessagesList';
import { redirect, useParams, useNavigate } from 'react-router';

const UserPage = observer(() => {
  const navigate = useNavigate();
  let params = useParams();
  
  const user = useLocalObservable(() => myUser);
  
  useEffect(() => {
    try {
      if (!user.user.isAuthenticated) {
        navigate('/')
      }
      user.fetchUser(`users/${params.id}`)
    } catch (err) {
      console.log('err: ', err.message);
      throw redirect("/");
    } 
  }, []);

  return (
    <Container maxWidth="md" sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100vw',
      height: '100vh'
    }}>
      <Header />
      <Divider sx={{
        borderColor: "#abc1d6ff",
        borderWidth: "1px"
      }} />
      <SideList params={params.id}/>
      
      <Box
        component="section"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: "transparent",
          color: 'text.primary',
          borderRadius: 1,
          p: 3,
          pt: 0,
          flexDirection: "column",
          height: "90%",
        }}
      >
        <MessagesList />
        <Divider sx={{
                borderColor: "#6f89a1ff"
            }} />
        <MessageForm params={params.id} />
      </Box>
    </Container>
  );
});

export default UserPage;



