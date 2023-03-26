import React, { useContext, useEffect,useState } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Copyright from './Copyright';
import Typography from '@mui/material/Typography';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
import logo from '../images/p_logo.png';
import player from '../images/guy.png';
import LoginScreen from './LoginScreen';
import Divider from '@mui/material/Divider';
import RegisterScreen from './RegisterScreen';

export default function SplashScreen() {
    const { store } = useContext(GlobalStoreContext);
    const [Login, setLogin] = useState("SignIn");
    store.history = useHistory();
    function handleGuest(){
        store.history.push("/public/");
    }
    function handleSignIn(){
        setLogin("SignIn");
    }
    function handleRegister(){
        setLogin("Register");
    }
    return (
        <div id="splash-screen">
             <div className='splash-header'>
                    <img className="logo" src={logo}/>
                    <h2>Welcome to PlayLister</h2>
                    <h4 style={{fontStyle:'italic'}}>Create and Publish PlayLists for the World to See!</h4>
                    {Login=="SignIn" ? <img className="images" src={player}/> :''}
            </div>
            <div className='splash-main'>
                { Login=="SignIn" ? <LoginScreen/>: <RegisterScreen/>}
                <Divider className='divider'>OR</Divider>
                <div className='button-group'>
                    {Login=="SignIn" 
                    ?<Button style={{backgroundColor:'#143C9A'}}  onClick={handleRegister} variant="contained">Register</Button>
                    :<Button style={{backgroundColor:'#143C9A'}} onClick={handleSignIn}  variant="contained">Sign In</Button>
                    }
                    <Button  style={{backgroundColor:'#143C9A'}}  onClick={handleGuest}   variant="contained">Guest</Button>
                </div>
            </div>
            <Copyright/>
        </div>
    )
}