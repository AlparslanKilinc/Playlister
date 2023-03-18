import { useContext,useEffect} from 'react'

import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import EditToolbar from './EditToolbar'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

function WorkspaceScreen(props) {
    const { store } = useContext(GlobalStoreContext);
    const {id} = props;

    function handleAddNewSong(event) {
        store.addNewSong();
    }
  
    return (
        <div className='workspace'>
        <List id="list-selector-list" sx={{  width:'100%' , backgroundColor: 'transparent',marginBottom:'1rem' }}>
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
                style={{backgroundColor:'#E6DDC4',marginBottom:'0.5rem' }}
                disabled={!store.canAddNewSong()}
                id='add-song-button'
                onClick={handleAddNewSong}
                variant="contained">
                <AddIcon  style={{color:'black'}} />
         </Button>
         <EditToolbar id={id}></EditToolbar>
         
         </div>
    )
}

export default  WorkspaceScreen;