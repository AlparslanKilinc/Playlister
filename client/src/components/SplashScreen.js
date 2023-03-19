import React, { useContext, useEffect,useState } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Copyright from './Copyright';
import Typography from '@mui/material/Typography';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
import logo from '../images/p_logo.png';
import LoginScreen from './LoginScreen';


export default function SplashScreen() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    function handleGuest(){
        store.history.push("/public/");
    }
    function handleRegister(){
        store.history.push("/register/");
    }
    return (
        <div id="splash-screen">
            <div className='splash-header'>
                <img className="images" src={logo}/>
                <h3>Welcome to Playlister</h3>
                <h4>Use Playlister to create,edit, and play playlists as well as share 
                playlists so that others may then play and comment on them</h4>
                <div class='button-group'>
                <Button  style={{backgroundColor:'#143C9A'}} onClick={handleRegister} variant="contained">Sign Up</Button>
                <Button style={{backgroundColor:'#143C9A'}} onClick={handleGuest}   variant="contained">Guest</Button>
                </div>
                <LoginScreen/>
            </div>
          
            <Copyright/>
        </div>
    )
}