import { useContext, useState,useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';


function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const {List} = props;

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }


    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
  

    let cardElement =
        <ListItem
            key={List._id}
            button
            onClick={(event) => {
                handleLoadList(event, List._id);
            }}
            onDoubleClick={handleToggleEdit}
        >  
        <Box style={{alignSelf:'flex-start', flex:'1'}} >{List.name}
            <Box style={{fontSize:'12pt'}} >By: {List.owner} </Box>
        </Box>
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + List._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={List.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 17,} }}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;
