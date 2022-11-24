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


  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      store.searchHome(event.target.value);
      store.clearTransaction();
    }
}


  return (
    <Box>
      <AppBar  position="static">
        <Toolbar id='AppTools' >
        <div className='tool-icons'>
        <IconButton href="/" disabled={!auth.loggedIn} aria-label="home">
          <HomeIcon/>
        </IconButton>

        <IconButton href="/AllLists" aria-label="all-list">
          <Groups3Icon/>
        </IconButton>

        <IconButton href="/Users" aria-label="users">
          <PersonIcon/>
        </IconButton>
        </div>

        <Search >
            <TextField      margin='normal'
                            id="search"
                            label="Search"
                            name="search"
                            onKeyPress= {handleSearch}
                        />
          </Search>
          <StyledMenu/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}