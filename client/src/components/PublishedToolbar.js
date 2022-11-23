import { useContext,useState } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';



function PublishedToolbar(props) {
    const { store } = useContext(GlobalStoreContext);
    const {id} = props;
    
    function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }
    
    function handleDuplicate(event, id) {
        event.stopPropagation();
        console.log("duplicate");
    }

    return (
        <div style={{alignSelf:'flex-end'}}>
                <Button 
                style={{backgroundColor:'#071935'}}
                variant="contained"
                onClick={(event) => {
                            handleDeleteList(event,id)
                        }} 
                aria-label='delete'>
                    <DeleteIcon style={{fontSize:'22pt'}} />
                </Button>

                <Button
                style={{backgroundColor:'#071935'}}
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