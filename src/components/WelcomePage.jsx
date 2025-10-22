import {Container, Box, Typography} from '@mui/material';
import {Link} from "react-router";
import WelcomePng from "../assets/welcome.png";

export default function WelcomePage () {
    return (
        <Container component="section" maxWidth="xl" sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            width: '100vw',
            height: '100vh',
            background: "pink",
            gap: 5
        }}>
            <Box>
                <Typography variant="h4" color="secondary" align='center' fontWeight={600}>Welcome to<br/> The Live-Chat</Typography>
            </Box>
            <Box >
            <img width="100%" src={WelcomePng} alt="welcome"/>
        </Box>
            <Box>
                <Link to="/login" style={{fontSize: 28}}>Log in to start chatting </Link>
            </Box>
        </Container>)
};