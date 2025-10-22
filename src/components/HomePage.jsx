import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from './Header';
import SideList from './SideList';

export default function HomePage() {
    
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
        // minHeight: '56px',
        flexDirection: "column"
      }}
    >
      nNNNNN
      
    </Box>
    </Container>
  );
}

