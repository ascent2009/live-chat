import { observer, useLocalObservable } from "mobx-react-lite";
import { myUser } from '../mobx'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from './Header';
import SideList from './SideList';
import { useNavigate, redirect } from 'react-router';


const HomePage = observer(() => {
  const navigate = useNavigate();
  const isAuthenticated = useLocalObservable(() => myUser)
  const user = useLocalObservable(() => myUser);
  
  if (!isAuthenticated.isAuthenticated) {
    // navigate('/')
    throw redirect("/");
  }
  return (
    <Container maxWidth="sm" sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100vw',
      height: '100vh'
    }}>
    <Header />
    <SideList/>
    
    <Box
      component="section"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
        flexDirection: "column"
      }}
    >
      {user.getUserName()}
      
    </Box>
    </Container>
  );
});

export default HomePage;



