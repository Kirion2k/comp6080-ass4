import React from 'react';
import { Navigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

function Dashboard () {
  const token = localStorage.getItem('token');

  if (token === null)  {
    return <Navigate to="/register" />
  }
  return (
    <>
      <h1> Dashboard </h1>
    </>
  );
}

export default Dashboard;