import CssBaseline from '@mui/material/CssBaseline';  
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ColorMode from "./ColorMode";
import { Outlet } from "react-router";


const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

export default function Layout() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme/>
      <ColorMode />
      <Outlet />
    </ThemeProvider>
  );
}
