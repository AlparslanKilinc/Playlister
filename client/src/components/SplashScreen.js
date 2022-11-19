import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Copyright from './Copyright';
import Typography from '@mui/material/Typography';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function SplashScreen() {


    return (
        <div id="splash-screen">
            <div className='splash-header'>
            <YouTubeIcon style={{fontSize:"100px" }}/>
            <Typography style={{fontStyle:"italic"}} variant="h2" component="h2">Playlister</Typography>
            </div>
            
            <div id='main-splash'>
                <Typography variant="h2" component="h2">
                    Welcome to Playlister
                </Typography>
                <Stack  spacing={2} direction="row" >
                    <Button href="/login/" style={{width:'160px', height:'70px',color:'white' , backgroundColor:"black"}}variant="contained">Login</Button>
                    <Button href="/register/" style={{ width:'180px',height:'70px',color:'white' , backgroundColor:"black"}} variant="contained"> Create Account</Button>
                </Stack> 
            </div>

            <div className='splash-bottom'>
            <Typography className='splash-text' variant="h4" component="h2">
                Use Playlister to create,edit, and play playlists 
                as well as share playlists 
                so that others may then play and comment on them
            </Typography>
            <Button href="/" style={{width:'190px', height:'70px', color:'white' , backgroundColor:"black"}}variant="contained">Continue as Guest</Button>
            </div>
         <Copyright style={{position: "fixed" , bottom: 0}}/>
        </div>
    )
}