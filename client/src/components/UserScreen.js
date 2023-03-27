import React, { useContext, useEffect,useState } from 'react'
import { GlobalStoreContext } from '../store'
import Typography from '@mui/material/Typography'
import AppTools from './AppTools';
import { ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import { VideoPlayer } from './VideoPlayer';
import { Comments } from './Comments';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { useHistory } from 'react-router-dom'
import MUIDeleteModal from './MUIDeleteModal';
import { ListArea } from './ListArea';
import MUIAccessErrorModal from './MUIAccessErrorModal'
import AppBanner from './AppBanner';

const UserScreen = () => {
  const theme = createTheme({
      palette: {
        primary: {
          main: '#143C9A',
          darker: '#1565c0',
        },
      },
    });
  const { store } = useContext(GlobalStoreContext);
  
  const [playerVariant, setPlayerVariant] = useState("contained");
  const [commentsVariant, setCommentsVariant] = useState("outlined");
  const [content,setContent]=useState("player");
  store.history = useHistory();
  useEffect(() => {
    store.LoadPublishedPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[store.search,store.sortMethod]);
  let togglePlayer = ()=>{
    setPlayerVariant("contained");
    setCommentsVariant("outlined");
    setContent("player");         
  }
  let toggleComments =()=>{
    setPlayerVariant("outlined");
    setCommentsVariant("contained");
    setContent("comments");
  }
  return (
    <div id="home-screen">
      <AppBanner/>
        <div className="home-main">
          <AppTools published={true}/>
          <div className='home-content'> 
          <ListArea parent={"UserScreen"}/>
          <div className='player-comments'>
              <ButtonGroup className='buttonGroup'>
              <ThemeProvider theme={theme}>
                <Button onClick={togglePlayer} color="primary"  variant={playerVariant} >Player</Button>
                <Button onClick={toggleComments} color="primary" variant={commentsVariant}>Comments</Button>
              </ThemeProvider>
              </ButtonGroup>
              {content=="player"?<VideoPlayer/>:<Comments/>}
          </div> 
        </div>
        </div>
        <MUIDeleteModal/>
        <MUIAccessErrorModal/>
    </div>)
}
export default UserScreen;