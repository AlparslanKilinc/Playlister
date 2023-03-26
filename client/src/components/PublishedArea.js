import { useContext,useEffect,useState } from 'react'
import List, { listClasses } from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import PublishedToolbar from './PublishedToolbar.js';


function PublishedArea(props) {
    const { store } = useContext(GlobalStoreContext);
    const {id,userName} = props;
    let handleSongSelect = (index,event)=>{
        event.stopPropagation();
        store.setPlay(index);
    }
    return (
        <div className='workspace'>
            <List 
                id="list-selector-list" 
                sx={{  width:'100%' , backgroundColor: 'transparent' }}
            >
                {
                store.currentList? store.currentList.songs.map((song, index) => (
                    <div className='song-card' onClick={(event)=>{handleSongSelect(index,event) }}  key={index+1}>
                        <h4  className="song-name" key={index} style={{color: store.playIndex===index? '#7369ff':'white'}}>
                        {index + 1}. {song.title} by {song.artist}
                        </h4>
                    </div>
                    )):""
                }
            </List>
            <PublishedToolbar userName={userName} id={id}></PublishedToolbar>
           
         </div>
    )
}
export default  PublishedArea;