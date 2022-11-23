import { useContext,useState } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';



function PublishedToolbar(props) {
    const { store } = useContext(GlobalStoreContext);
    const {id} = props;
    
    async function handleDeleteList(event, id) {
        event.preventDefault();
        event.stopPropagation();
        store.markListForDeletion(id);
    }
    
    async function handleDuplicate(event, id) {
        event.stopPropagation();
        console.log("duplicate");
    }

    return (
        <div style={{alignSelf:'flex-end'}}>
                <Button 
                variant="contained"
                onClick={(event) => {
                            handleDeleteList(event,id)
                        }} 
                aria-label='delete'>
                    <DeleteIcon style={{fontSize:'22pt'}} />
                </Button>

                <Button
                variant="contained"
                onClick={(event) => {
                            handleDuplicate(event,id)
                        }} 
                aria-label='duplicate'>
                    <ContentCopyIcon style={{fontSize:'22pt'}} />
                </Button>
        </div>
    )
}

export default PublishedToolbar;