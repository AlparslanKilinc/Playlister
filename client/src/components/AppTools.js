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

export default function AppTools() {
  const { store } = useContext(GlobalStoreContext);

  const handleSearch = (event) => {
    event.preventDefault();
    store.setSearch(event.target.value);
};

  return (
    <Box>
      <AppBar  position="static">
        <Toolbar id='AppTools' >
        <div className='tool-icons'>
        <IconButton aria-label="home">
          <HomeIcon/>
        </IconButton>

        <IconButton aria-label="all-list">
          <Groups3Icon/>
        </IconButton>

        <IconButton aria-label="users">
          <PersonIcon/>
        </IconButton>
        </div>

        <Search >
            <TextField      margin='normal'
                            id="search"
                            label="Search"
                            name="search"
                            autoFocus
                            onChange={handleSearch}
                        />
          </Search>
          <StyledMenu/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}