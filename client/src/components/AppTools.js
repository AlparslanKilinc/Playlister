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
import { useHistory } from 'react-router-dom'

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
  store.history = useHistory();
 

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      store.setSearch(event.target.value);
      }
  }

  let clear = ()=>{
    store.setSearch("");
  }



  return (
    <Box>
      <AppBar  position="static">
        <Toolbar id='AppTools' >
        <div className='tool-icons'>
        <IconButton href="/" color={store.history.location.pathname==="/"? 'success' :'default'} onClick={clear} disabled={!auth.loggedIn} aria-label="home">
          <HomeIcon/>
        </IconButton>

        <IconButton href="/AllLists"  color={store.history.location.pathname==="/AllLists"? 'success' :'default'}  onClick={clear} aria-label="all-list">
          <Groups3Icon/>
        </IconButton>

        <IconButton href="/Users" color={store.history.location.pathname==="/Users"? 'success' :'default'}  onClick={clear} aria-label="users">
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