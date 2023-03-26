import React, { useContext, useEffect,useState } from 'react'
import YouTube from 'react-youtube';
import { GlobalStoreContext } from '../store'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';

export const VideoPlayer = (props) => {
const { store } = useContext(GlobalStoreContext);
const theme = useTheme();
const [player,setPlayer]=useState(null);
const [list,setList]=useState(null);
const {selection} = props;
const playerOptions = {
  height:'100%',
  width:'100%',
  borderRadius:'10px',
  playerVars: {
    mute:0,
    controls:0,
    host: 'https://www.youtube.com',
    origin: 'https://localhost:3000',
  },
};
useEffect( ()=>{
  if(player&& player.h)loadCurrentSong(player);
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[store.currentList , store.playIndex])

let addListen = ()=>{
  if(store.currentList !==list && store.currentList.published){
    store.AddListen(store.currentList._id);
  }
}

let onPlayerReady=(event)=>{
  setPlayer(event.target);
  loadCurrentSong(event.target);
}

let loadCurrentSong = (player)=>{
  if(store.currentList &&store.currentList.songs[store.playIndex]){
      player.cueVideoById(store.currentList.songs[store.playIndex]? store.currentList.songs[store.playIndex].youTubeId: '');
    }  
}

let play =()=>{
  if(player && player.h){
    player.playVideo();
  }
}

let pause=()=>{
 if(player && player.h)player.pauseVideo();
}

let prev =()=>{
  if(store.playIndex===0){
    if(store.currentList && store.currentList.songs.length-1 >0)store.setPlay(store.currentList.songs.length-1);
  }else{
    store.setPlay(store.playIndex-1);
  }
}

let next =()=>{
  if(store.playIndex<store.currentList.songs.length-1){
    store.setPlay(store.playIndex+1);
  }else{
    store.setPlay(0);
  }
}

let onPlayerStateChange= (event)=>{
  let playerStatus = event.data;
  if (playerStatus === -1) {
    /// Video Not started 
  }else if (playerStatus === 0) {
    /// Video ended
    next();
  }else if (playerStatus === 1) {
    /// Video played
    addListen();
    setList(store.currentList);
  } else if (playerStatus === 2) {
    /// Video paused
  } else if (playerStatus === 3) {
    /// Video buffering
  } else if (playerStatus === 5) {
    /// Video cued
    if(store.playIndex!==0)play();
  }
}
return(
    <div style={{ opacity: selection === "contained" ? '1' :'0' , pointerEvents: selection === "contained" ? 'auto' :'none' }} className='video-player'>
          { store.currentList? 
          <YouTube
          disabled={selection !== "contained"}
          className='video-area'
          onReady={onPlayerReady}
          videoId={store.currentList.songs[store.playIndex]? store.currentList.songs[store.playIndex].youTubeId: ''}
          opts={playerOptions}
          onStateChange={onPlayerStateChange}
           />
          : <Box className='video-area' />
          }
      <div  className='video-actions'>
              <Box className='video-buttons'>
                <IconButton style={{color:'white'}} onClick={prev} aria-label="previous">
                  {theme.direction === 'rtl' ? <SkipNextIcon  /> : <SkipPreviousIcon  />}
                </IconButton>
                <IconButton style={{color:'white'}} onClick={pause} aria-label="play">
                  <PauseIcon />
                </IconButton>
                <IconButton style={{color:'white'}} onClick={play} aria-label="play">
                  <PlayArrowIcon />
                </IconButton>
                <IconButton style={{color:'white'}} onClick={next} aria-label="next">
                  {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                </IconButton>
              </Box>
       </div>
    </div>
  )
}
