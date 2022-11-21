import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { WorkspaceScreen } from '.';

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

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
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
            id='user-list'
            button
            onClick={(event) => {
                handleLoadList(event, List._id)
            }}
            onDoubleClick={handleToggleEdit}
        > 
           <Accordion style={{ width:'100%', flex:'1', backgroundColor:'transparent', boxShadow:'none'}}>
                <AccordionSummary
                expandIcon={<KeyboardDoubleArrowDownIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{display:'flex', alignItems:'flex-end'}}
                >
                <Box >{List.name}
                <Box style={{fontSize:'12pt'}} >By: {List.owner} </Box>
                </Box>
                </AccordionSummary>
                <AccordionDetails style={{display:'flex'}}>
                <WorkspaceScreen 
                id={List._id}/>
                </AccordionDetails>
            </Accordion>
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


////  Delete and Edit Buttton
/* <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{fontSize:'48pt'}} />
                </IconButton>
            </Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                    <DeleteIcon style={{fontSize:'48pt'}} />
                </IconButton>
            </Box> */