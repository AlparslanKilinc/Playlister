import { useContext,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import {Statusbar} from './'
import MUIAccessErrorModal from './MUIAccessErrorModal.js'
import EditToolbar from './EditToolbar'

/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
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
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
   
    return (
        <div className='workspace'>
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
         <EditToolbar></EditToolbar>
         { modalJSX }
         </div>
    )
}

export default  WorkspaceScreen;