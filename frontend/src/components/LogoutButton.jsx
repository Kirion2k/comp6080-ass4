import React from 'react';
import { Button } from '@mui/material';

function LogoutButton({ onLogout }) {

    return (
        <Button color="inherit" onClick={onLogout}>
            Logout
        </Button>
    );
}

export default LogoutButton;