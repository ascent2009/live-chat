import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useColorScheme } from '@mui/material/styles';
// import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
// import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import SignMenu from './SignMenu';
// import SideList from './SideList';

export default function Header() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  const handleColorMode = () => {
    if(mode === 'light') setMode("dark")
      else setMode("light")
  }
  
  return (
    <Box component="header" pt={2} sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
      
    }}>
        
        {/* <SideList /> */}
        <SignMenu />
        <IconButton 
            aria-label="color mode"
            color="primary"
            onClick={() => {handleColorMode()}}>
            {mode==='light' ? <DarkModeIcon /> : <LightModeIcon/>}
        </IconButton>
    </Box>
  )
}