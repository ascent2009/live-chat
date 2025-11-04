import { BrowserRouter, Routes, Route } from "react-router";
import Login from './components/Login';
import WelcomePage from './components/WelcomePage';
import HomePage from './components/HomePage';
import Layout from './components/Layout';
import Settings from './components/Settings';


export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
