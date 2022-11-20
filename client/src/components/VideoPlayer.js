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


export const VideoPlayer = () => {

  const { store } = useContext(GlobalStoreContext);
  const [currentSong, updateCurrentSong] = useState(0);
  const theme = useTheme();
  
  useEffect(() => {
    store.loadIdNamePairs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

const playerOptions = {
  height: '400px',
  width: '950px',
  playerVars: {
      autoplay: 0,
  },
};

// THIS FUNCTION LOADS THE CURRENT SONG INTO
// THE PLAYER AND PLAYS IT
function loadAndPlayCurrentSong(player) {
  if(store.currentList.songs[currentSong]){
  player.loadVideoById(store.currentList.songs[currentSong].youTubeId);
  player.playVideo();
  }
}

// THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
function incSong() {
  updateCurrentSong(currentSong++);
  updateCurrentSong(currentSong % store.currentList.songs.length);
}

function onPlayerReady(event) {
  loadAndPlayCurrentSong(event.target);
  event.target.playVideo();
}

// THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
// CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
// VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
// VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
function onPlayerStateChange(event) {
  let playerStatus = event.data;
  let player = event.target;
  if (playerStatus === -1) {
      // VIDEO UNSTARTED
      console.log("-1 Video unstarted");
  } else if (playerStatus === 0) {
      // THE VIDEO HAS COMPLETED PLAYING
      console.log("0 Video ended");
      incSong();
      loadAndPlayCurrentSong(player);
  } else if (playerStatus === 1) {
      // THE VIDEO IS PLAYED
      console.log("1 Video played");
  } else if (playerStatus === 2) {
      // THE VIDEO IS PAUSED
      console.log("2 Video paused");
  } else if (playerStatus === 3) {
      // THE VIDEO IS BUFFERING
      console.log("3 Video buffering");
  } else if (playerStatus === 5) {
      // THE VIDEO HAS BEEN CUED
      console.log("5 Video cued");
  }
}

/// Null checks 

  let videoInfo = 
  <CardContent className='video-info'>
  <Typography component="div" variant="h4">
    Now Playing
  </Typography>
  </CardContent> ; 

  if(store.currentList){
    if(store.currentList.songs[currentSong]){
    videoInfo = 
    <CardContent className='video-info'>
    <Typography component="div" style={{justifyContent:'center'}}variant="h4">
     Now Playing
    </Typography>
    <Typography component="div" variant="h6">
      Playlist: {store.currentList.name}
    </Typography>
    <Typography component="div" variant="h6">
      Song Number:{currentSong}
    </Typography>
    <Typography component="div" variant="h6">
      Title: {store.currentList.songs[currentSong].title}
    </Typography>
    <Typography component="div" variant="h6">
      Artist: {store.currentList.songs[currentSong].artist}
    </Typography>
    </CardContent> ; 
    }
  }







  return (
    <div className='video-player'>

      <div className='video-area'>
          { store.currentList? 
          <YouTube
          videoId={store.currentList.songs[currentSong] ? store.currentList.songs[currentSong].youTubeId : ''}
          opts={playerOptions}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange} />
          :   ''}
      </div>
        <div className='video-actions'>
              {videoInfo}
              <Box className='video-buttons'>
                <IconButton aria-label="previous">
                  {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                </IconButton>
                <IconButton aria-label="play/pause">
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                </IconButton>
                <IconButton aria-label="next">
                  {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                </IconButton>
              </Box>

          </div>
    </div>
  )
}
