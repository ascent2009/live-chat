import Box from '@mui/material/Box';
import SignMenu from './SignMenu';

export default function Header() {
  
  return (
    <Box component="header" pt={2} sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
      
    }}>
        <SignMenu />
    </Box>
  )
}