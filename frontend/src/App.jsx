import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NavBar from './components/Navbar';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  const [userToken, setUserToken] = React.useState(localStorage.getItem('token'));

  const setTokenAbstract = (token) => {
    setUserToken(token);
    localStorage.setItem('token', token);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserToken(null); 
  }

  return (
    <BrowserRouter>
      <NavBar onLogout={handleLogout} />
      <Routes>
        {/* Redirect from root to /login or /dashboard based on authentication status */}
        <Route path="/" element={<Navigate to={userToken ? "/dashboard" : "/login"} />} />

        <Route path="/register" element={<Register setTokenFunction={setTokenAbstract} />} />
        <Route path="/login" element={userToken ? <Navigate to="/dashboard" /> : <Login UserToken={userToken} setTokenFunction={setTokenAbstract} />} />
        <Route path="/dashboard" element={!userToken ? <Navigate to="/login" /> : <Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
