import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import logo from '../images/p_logo.png';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    const handleLogout = () => {
        auth.logoutUser();
        store.clearTransaction();
    }
    
    function getAccountMenu(loggedIn) {
        if (loggedIn)
            return <Button onClick={handleLogout} style={{color:'#143C9A'}}><LogoutIcon></LogoutIcon></Button>;
        else
            return '';
    }

    return (
        <Box>
            <AppBar className='banner' position="static">
                <Toolbar id='app-banner'>
                    <Link style={{ textDecoration: 'none'}} to={ auth.loggedIn? '/home/':'/'}>
                        <img className="banner-logo" src={logo}/>   
                    </Link>
                    {getAccountMenu(auth.loggedIn)}
                </Toolbar>
            </AppBar>
        </Box>
    );
}