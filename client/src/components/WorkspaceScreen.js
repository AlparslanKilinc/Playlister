import { useContext,useEffect,useState } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import MUIAccessErrorModal from './MUIAccessErrorModal.js'
import EditToolbar from './EditToolbar'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

function WorkspaceScreen(props) {
    const { store } = useContext(GlobalStoreContext);
    const {id} = props;
    store.history = useHistory();
    
   
    useEffect(() => {
          store.LoadPlaylists();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    function handleAddNewSong(event) {
        event.stopPropagation();
        store.addNewSong();
    }

 
   
    return (
        <div className='workspace'>
        { modalJSX }
        <MUIAccessErrorModal/>      
        <List 
            id="list-selector-list" 
            sx={{  width:'100%' , bgcolor: 'transparent' }}
        >
            {
               store.currentList? store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                )):""
            }
         </List> 
         <Button
                disabled={!store.canAddNewSong()}
                id='add-song-button'
                onClick={handleAddNewSong}
                variant="contained">
                <AddIcon />
            </Button>
         <EditToolbar id={id} ></EditToolbar>
         
         </div>
    )
}

export default  WorkspaceScreen;