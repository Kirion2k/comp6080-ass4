import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Snackbar, Alert } from '@mui/material';

function Login ({ UserToken, setTokenFunction }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post('http://localhost:5005/admin/auth/login', {
        email,
        password,
      });

      setTokenFunction(response.data.token);
      navigate('/dashboard'); 
    } catch (err) {
      setError(err.response.data.error);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button variant="contained" type="submit">Login</Button>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </form>
  );
}

export default Login;
