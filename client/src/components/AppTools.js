import React, { useContext, useEffect,useState } from 'react'
import { styled, alpha } from '@mui/material/styles';
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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

export default function AppTools(props) {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const {published}= props;

  useEffect(() => {
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[store.currentScreen]);
 

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      store.setSearch(event.target.value);
      }
  }


  let handleAllListScreen = ()=>{
    store.setScreen('AllListScreen');
  }

  let handleHomeScreen = ()=>{
    store.setScreen('HomeScreen');
  }

  let handleUserScreen = ()=>{
    store.setScreen('UserScreen');
  }



  return (
    <Box>
      <AppBar  position="static">
        <Toolbar id='AppTools' >
        <div className='tool-icons'>
        <IconButton  onClick={handleHomeScreen}  color={store.currentScreen==="HomeScreen"? 'warning' :'default'}  disabled={!auth.loggedIn} aria-label="home">
          <HomeIcon/>
        </IconButton>

        <IconButton onClick={handleAllListScreen} color={store.currentScreen==="AllListScreen"? 'warning' :'default'}   aria-label="all-list">
          <Groups3Icon/>
        </IconButton>

        <IconButton  onClick={handleUserScreen}   color={store.currentScreen==="UserScreen"? 'warning' :'default'} aria-label="users">
          <PersonIcon/>
        </IconButton>
        </div>

        <Search >
            <TextField      margin='normal'
                            id="search"
                            label="Search"
                            name="search"
                            defaultValue={""}
                            onKeyPress= {handleSearch}
                        />
          </Search>
          <StyledMenu published={published}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}