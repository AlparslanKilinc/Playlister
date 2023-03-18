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


export default function AppTools(props) {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const {published}= props;
  store.history = useHistory();

const handleSearch = (event) => {
  if (event.key === 'Enter') {
    store.setSearch(event.target.value);
    }
}

let loadScreen = (screen) =>{
  if(screen == "home"){
    store.history.push("/home/");
  }else if(screen=="public"){
    store.history.push("/public/");
    
  }else if(screen=="users"){
    store.history.push("/users/");
  }
}
return (
  <Box>
    <AppBar  position="static">
    <Toolbar id='AppTools'>
      <div className='tool-icons'>
        <IconButton  onClick={()=>{loadScreen("home")}}  color={store.history.location.pathname==="/home/"? 'success' :'default'}  disabled={!auth.loggedIn} aria-label="home">
          <HomeIcon/>
        </IconButton>
        <IconButton onClick={()=>{loadScreen("public")}} color={store.history.location.pathname==="/public/"? 'success' :'default'}   aria-label="all-list">
          <Groups3Icon/>
        </IconButton>
        <IconButton  onClick={()=>{loadScreen("users")}}   color={store.history.location.pathname==="/users/"? 'success' :'default'} aria-label="users">
          <PersonIcon/>
        </IconButton>
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