import React, { useContext, useEffect,useState } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Copyright from './Copyright';
import Typography from '@mui/material/Typography';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'

export default function SplashScreen() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
   

    function handleGuest(){
        store.history.push("/public/");
    }
    function handleLogin(){
        store.history.push("/login/");
    }
    function handleRegister(){
        store.history.push("/register/");
    }


    return (
        <div id="splash-screen">
            <div className='splash-header'>
                <h3>Welcome to Playlister</h3>
                <h4>Use Playlister to create,edit, and play playlists as well as share playlists so that others may then play and comment on them</h4>
            </div>
            <div id='main-splash'>
                <Button onClick={handleLogin} style={{width:'190px', height:'70px',color:'white' , backgroundColor:"black"}}variant="contained">Login</Button>
                <Button onClick={handleRegister}  style={{ width:'190px',height:'70px',color:'white' , backgroundColor:"black"}} variant="contained"> Create Account</Button>
                <Button  onClick={handleGuest} style={{width:'190px', height:'70px', color:'white' , backgroundColor:"black"}}variant="contained">Continue as Guest</Button>
            </div>
         <Copyright/>
        </div>
    )
}