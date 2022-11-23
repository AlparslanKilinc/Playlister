import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';


function PublishedCard(props) {
    
    const { store } = useContext(GlobalStoreContext);
    const {List} = props;

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            store.setCurrentList(id);
        }
    }
  
    return (
        <ListItem
            key={List._id}
            button
            onClick={(event) => {
                handleLoadList(event, List._id);
            }}
        >  
            <Box style={{alignSelf:'flex-start', flex:'1'}} >{List.name}
                <Box style={{fontSize:'12pt'}} >By: {List.owner} </Box>
            </Box>
        </ListItem>
    );
}

export default PublishedCard;