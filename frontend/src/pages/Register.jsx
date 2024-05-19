import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Snackbar, Alert } from '@mui/material';
import axios from 'axios';


function Register({ setTokenFunction }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const register = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5005/admin/auth/register', {
        email,
        password,
        name,
      });

      console.log('Registration successful', response.data);
      localStorage.setItem('token', response.data.token);
      setTokenFunction(response.data.token); 
      navigate('/dashboard'); 
      
    } catch (error) {
      console.error('Registration failed', error.response ? error.response.data : 'Server error');
      setError(error.response ? error.response.data.error : 'An unexpected error occurred');
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
    <form onSubmit={register} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Register</h2>
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Name"
        variant="outlined"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
      <TextField
        label="Confirm Password"
        variant="outlined"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <Button variant="contained" type="submit">Register</Button>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </form>
  );
}

export default Register;
