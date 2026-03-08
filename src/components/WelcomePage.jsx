import { Container, Box, Grid, Typography } from '@mui/material';
import { Link } from "react-router";
import WelcomePng from "../assets/welcome.png";

export default function WelcomePage () {
    return (
        <Container 
            component="section"
            maxWidth="xl"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: '100vh',
            }}
        >
            <Grid container spacing={2} direction="column"
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
            <Grid size={10}>
                <Typography variant="h4" color="secondary" align='center' fontWeight={600}>Welcome to The Live-Chat</Typography>
            </Grid>
            <Grid size="grow">
                <Container maxWidth="sm"
                    component="img"
                    src={WelcomePng}
                    alt="welcome"
                 />
             </Grid>
            <Grid size={10} align="center">
                <Link to="/login" style={{fontSize: 28}}>Log in to start chatting </Link>
            </Grid>
            </Grid>
        </Container>)
};