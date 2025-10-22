import { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';  
import { ThemeProvider, createTheme } from '@mui/material/styles';
import WelcomePage from "./components/WelcomePage";
import HomePage from "./components/HomePage";
import ColorMode from "./components/ColorMode";


const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

export default function App() {
  const [user, setUser] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme/>
      <ColorMode />
      {!user ? <HomePage /> : <WelcomePage />}
    </ThemeProvider>
  );
}
