import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useColorScheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

export default function App() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  const handleColorMode = () => {
    if(mode === 'light') setMode("dark")
      else setMode("light")
  }
  return (
    <Box position="absolute" top={25} left={20}>
        <IconButton 
                aria-label="color mode"
                color="primary"
                onClick={() => {handleColorMode()}}>
                {mode==='light' ? <DarkModeIcon /> : <LightModeIcon/>}
        </IconButton>
   </Box>
  )
}