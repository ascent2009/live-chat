import { BrowserRouter, Routes, Route } from "react-router";
import Login from './components/Login';
import WelcomePage from './components/WelcomePage';
import UserPage from './components/UserPage';
import Layout from './components/Layout';
import Settings from './components/Settings';


export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="user/:id" element={<UserPage />} />
          <Route path="profile/:id" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
