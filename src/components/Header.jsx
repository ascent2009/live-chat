import Box from '@mui/material/Box';
import SignMenu from './SignMenu';
import { observer} from "mobx-react-lite";

const Header = observer(() => {
  
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
})

export default Header;