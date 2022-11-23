import { useContext,useEffect,useState } from 'react'
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import MUIDeleteModal from './MUIDeleteModal.js'
import PublishedToolbar from './PublishedToolbar.js';


function PublishedArea(props) {
    const { store } = useContext(GlobalStoreContext);
    const {id} = props;
    
    useEffect(() => {
          store.LoadPlaylists();
          store.setCurrentList(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    return (
        <div className='workspace'>
            <List 
                id="published-list" 
                sx={{  width:'100%' , backgroundColor: 'transparent' }}
            >
                {
                store.currentList? store.currentList.songs.map((song, index) => (
                    <div className='published-card' key={index+1}>
                        <p>
                        {index + 1}. {song.title} by {song.artist}
                        </p>
                    </div>
                    )):""
                }
            </List>
            <PublishedToolbar id={id}></PublishedToolbar>
           
         </div>
    )
}

export default  PublishedArea;