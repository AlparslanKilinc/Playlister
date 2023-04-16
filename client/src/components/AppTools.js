import React, { useContext, useEffect,useState,} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import Groups3Icon from '@mui/icons-material/Groups3';
import PersonIcon from '@mui/icons-material/Person';
import StyledMenu from './StyledMenu'
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import { useHistory } from 'react-router-dom'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

export default function AppTools(props) {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const {published}= props;
  store.history = useHistory();

  const theme = createTheme({
    palette: {
      primary:{
        main:'#143C9A'
      }
    },
  });

const handleSearch = (event) => {
  if (event.key === 'Enter') {
    store.setSearch(event.target.value);
    }
}

let loadScreen = (screen) =>{
  if(screen == "home"){
    store.clearCurrentList();
    store.history.push("/home/");
  }else if(screen=="public"){
    store.clearCurrentList();
    store.history.push("/public/");
    
  }else if(screen=="users"){
    store.clearCurrentList();
    store.history.push("/users/");
  }
}
return (
  <Box>
    <AppBar  position="static">
      <Toolbar id='nav-bar'>
        <div className='nav-icons'>
        <ThemeProvider theme={theme}>
          <IconButton  onClick={()=>{loadScreen("home")}}  color={store.history.location.pathname==="/home/"? 'primary' :'default'}  disabled={!auth.loggedIn} aria-label="home">
            <HomeIcon/>
          </IconButton>
          <IconButton onClick={()=>{loadScreen("public")}} color={store.history.location.pathname==="/public/"? 'primary' :'default'}   aria-label="all-list">
            <Groups3Icon/>
          </IconButton>
          <IconButton  onClick={()=>{loadScreen("users")}}   color={store.history.location.pathname==="/users/"? 'primary' :'default'} aria-label="users">
            <PersonIcon/>
          </IconButton>
        </ThemeProvider>
        </div>
        <TextField
        margin='normal'
        id="search"
        label="Search"
        name="search"
        defaultValue={""}
        color={'success'}
        onKeyPress= {handleSearch}
        /> 
        <StyledMenu published={published}/>
      </Toolbar>
    </AppBar>
  </Box>
  );
}