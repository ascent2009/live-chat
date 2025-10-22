import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css';
import ToggleColorMode from './App';
import Login from './components/Login';
import WelcomePage from './components/WelcomePage';
import HomePage from './components/HomePage'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<App />} />
        <Route path="welcome" element={<WelcomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        {/* <Route path="register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
