import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import LogoutButton from './LogoutButton'; 

const NavBar = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  // Determine if we're on the login or register page
  const isLoginOrRegister = location.pathname === '/login' || location.pathname === '/register';

  return (
    <AppBar position="static">
      <Toolbar>
        {isLoginOrRegister && (
          <>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate('/register')}>
              Register
            </Button>
          </>
        )}
        {token && <LogoutButton onLogout={onLogout} />}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
