import { useEffect, useState } from 'react';
import { observer, useLocalObservable } from "mobx-react-lite";
import { myUser } from '../mobx';
import { toJS } from 'mobx';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from './Header';
import SideList from './SideList';
import { redirect, useParams, useNavigate } from 'react-router';
import { getDatabase, ref, set, onValue} from "firebase/database";

const UserPage = observer(() => {
  const navigate = useNavigate();
  let params = useParams();
  
  const user = useLocalObservable(() => myUser);

  const getUser = () => {
    const db = ref(getDatabase(), `users/${params.id}`);
    onValue(db, (snapshot) => {
      const data = snapshot.val();
      // const obj = Object.keys(data).map((sn) => data[sn])
      console.log(data);
      user.setUserID = data.id;
      user.setUserName(data.name);
      user.setNickName = data.nickname;
      user.setAuthenticate = true;
    })
  } 

  getUser()

    // function handleStorage() {
  //   if (!localStorage.users) {
  //     localStorage.setItem("users", JSON.stringify([{
  //                   id: isAuthenticated.id,            
  //                   name: isAuthenticated.name,
  //                   nikname: isAuthenticated.nickname,
  //                   isAuthenticated: isAuthenticated.isAuthenticated
  //               }])) 
  //   } else {
  //     localStorage.setItem("users", JSON.stringify([...new Map([...JSON.parse(localStorage.getItem('users')), {
  //                   id: isAuthenticated.id,                        
  //                   name: isAuthenticated.name,
  //                   nikname: isAuthenticated.nickname,
  //                   isAuthenticated: isAuthenticated.isAuthenticated
  //               }].map(item => [item.name, item])).values()]))
  //   }
  // }

  useEffect(() => {
    // handleStorage();
    try {
      if (!user.user.isAuthenticated) {
        navigate('/')
      }
    } catch (err) {
      console.log('err: ', err.message);
      throw redirect("/");
    }
  
    user.fetchUsers
  }, []);

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
      {user.user.nickname ? user.user.nickname : user.user.name}
      <br/>
      <br/>
      <p>{user.user.id}</p>
      <p>{user.user.name}</p>
      <p>{user.user.nickname}</p>
      <p>{user.user.isAuthenticated.toString()}</p>
    </Box>
    </Container>
  );
});

export default UserPage;



