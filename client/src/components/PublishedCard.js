import { useContext, useState,useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Button from '@mui/material/Button';
import AuthContext from '../auth'

function PublishedCard(props) {
    
    const { store } = useContext(GlobalStoreContext);
    const {List} = props;
    const { auth } = useContext(AuthContext);
    
    function handleLike(event){
        event.stopPropagation();
        event.preventDefault();
        store.AddLike(List._id);
    }

    function handleDislike(event){
        event.stopPropagation();
        event.preventDefault();
        store.AddDislike(List._id);
    }
  
    return (
        <ListItem className='card' key={List._id}>  
            <Box style={{display:'flex' , flexDirection:'column'}}>
                <Box className='title-name' >{List.name}</Box>
                <Box style={{color:'blue' ,display:'flex'}} > <p style={{color:'black'}}>By:</p> {List.owner} </Box>
                <Box style={{ display:'flex', color:'red'}} > <p style={{color:'black'}}>Listens:</p> {List.listens} </Box>
                <Box style={{display:'flex', color:'green'}} > <p style={{color:'black'}}>Published:</p>{new Date(List.date).toDateString()} </Box>
                <div className='like-group'> 
                    <Button
                        className='like'
                        id='like' 
                        disabled={!auth.loggedIn}
                        onClick={handleLike}
                        variant="none">
                        <ThumbUpIcon />
                        <Box style={{marginLeft:'0.3rem'}} >{List.likes} </Box>
                    </Button>
                    <Button
                        className='like'
                        id='like'
                        disabled={!auth.loggedIn}
                        onClick={handleDislike}
                        variant="none">
                        <ThumbDownIcon/>
                        <Box style={{ marginLeft:'0.3rem'}} >{List.dislikes} </Box>
                    </Button>
                </div>
            </Box>
        </ListItem>
    );
}
export default PublishedCard;