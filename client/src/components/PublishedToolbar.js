import { useContext,useState,useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AuthContext from '../auth'


function PublishedToolbar(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const {id,userName} = props;
   

    function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }
    
    function handleDuplicate(event, id) {
        event.stopPropagation();
        store.duplicate(id,true);
    }
    let u = ""
    if(auth.user){
        u=auth.user.userName;
    }
    return (
        <div style={{ display:'flex',gap:'0.3rem'}}>
                <button
                id='delete-button'
                disabled={userName  !==  u}
                variant="contained"
                onClick={(event) => {
                            handleDeleteList(event,id)
                        }} 
                aria-label='delete'>
                    <DeleteIcon/>
                </button>

                <button
                id='duplicate-button'
                disabled={!auth.loggedIn}
                variant="contained"
                onClick={(event) => {
                            handleDuplicate(event,id)
                        }} 
                aria-label='duplicate'>
                    <ContentCopyIcon/>
                </button>
        </div>
    )
}

export default PublishedToolbar;