import { useContext, useState,useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Button from '@mui/material/Button';

function PublishedCard(props) {
    
    const { store } = useContext(GlobalStoreContext);
    const {List} = props;


    
    function handleLike(event){
        event.stopPropagation();
        event.preventDefault();
        console.log("like");
        store.AddLike(List._id);
    }

    function handleDislike(event){
        event.stopPropagation();
        event.preventDefault();
        store.AddDislike(List._id);
        console.log("dislike");

    }
  
    return (
        <ListItem
            className='card'
            key={List._id}
            
        >  
            <Box style={{alignSelf:'flex-start', gap:'2rem', flex:'1'}} >{List.name}
                <Box style={{fontSize:'12pt',color:'blue' ,display:'flex' ,gap:'.5rem'}} > <p style={{color:'black'}}>By:</p> {List.owner} </Box>
                <Box style={{display:'flex', gap:'.5rem',fontSize:'12pt',marginTop:'1rem', color:'green'}} > <p style={{color:'black'}}>Published:</p>{new Date(List.date).toDateString()} </Box>
            </Box>
            
            <Box style={{display:'flex' , flexDirection:'column'}}>
                <div>
                <Button
                    className='like'
                    id='like' 
                    onClick={handleLike}
                    variant="none">
                    <ThumbUpIcon />
                    <Box style={{fontSize:'12pt', margin:'1rem',marginTop:'1rem'}} >{List.likes} </Box>
                </Button>
                <Button
                    className='like'
                    id='like'
                    onClick={handleDislike}
                    variant="none">
                    <ThumbDownIcon />
                    <Box style={{fontSize:'12pt', margin:'1rem',marginTop:'1rem'}} >{List.dislikes} </Box>
                </Button>
                </div>
                <Box style={{ display:'flex', gap:'.5rem',fontSize:'12pt',marginBottom:'2rem', color:'red'}} > <p style={{color:'black'}}>Listens:</p> {List.listens} </Box>
              </Box>
        </ListItem>
    );
}

export default PublishedCard;