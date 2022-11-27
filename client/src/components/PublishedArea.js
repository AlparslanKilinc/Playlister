import { useContext,useEffect,useState } from 'react'
import List, { listClasses } from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import PublishedToolbar from './PublishedToolbar.js';


function PublishedArea(props) {
    const { store } = useContext(GlobalStoreContext);
    const {id,userName} = props;
   
    useEffect(() => {
          store.LoadPublishedPlaylists();
          store.setPublishedList(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let handleSongSelect = (index)=>{
        store.setPlay(index);
    }
    

    return (
        <div className='workspace'>
            <List 
                id="published-list" 
                sx={{  width:'100%' , backgroundColor: 'transparent' }}
            >
                {
                store.currentList? store.currentList.songs.map((song, index) => (
                    <div onClick={()=>{handleSongSelect(index) }} className='published-card' key={index+1}>
                        <p>
                        {index + 1}. {song.title} by {song.artist}
                        </p>
                    </div>
                    )):""
                }
            </List>
            <PublishedToolbar userName={userName} id={id}></PublishedToolbar>
           
         </div>
    )
}

export default  PublishedArea;