import React, { useContext, useEffect,useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import AppTools from './AppTools';
import { ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import { VideoPlayer } from './VideoPlayer';
import { Comments } from './Comments';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { WorkspaceScreen } from '.';
import PublishedCard from './PublishedCard';
import { useHistory } from 'react-router-dom'
import PublishedArea from './PublishedArea';
import MUIDeleteModal from './MUIDeleteModal';
import MUIAccessErrorModal from './MUIAccessErrorModal'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import AppBanner from './AppBanner';

const HomeScreen = () => {
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
    const [expanded, setExpanded] = useState(false);
    store.history = useHistory();

    useEffect(() => {
      store.scrollUp('scroll-list');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.playlists?store.playlists.length: '']);

    useEffect(() => {
      store.LoadPlaylists();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[store.search,store.sortMethod,store.currentList? store.currentList._id:'']);
    /// Accordion 
    const handleChange = (panel,id) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
      store.clearTransaction();
      if(!store.currentList || store.currentList._id!== id){
        store.setCurrentList(id);
      }
    };
    let handleCreateNewList =(event) =>{
        setExpanded('panel');
        store.createNewList();
    }
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
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    let Lists = "";
      if (store.playlists) {
        let playlists=store.playlists;
        Lists = 
        <List sx={{padding:'1rem'}} id="scroll-list" className='list-area'>
          {
            playlists.map((list) => (
            <Accordion 
            key={list._id} id='list-item' 
            style={{backgroundColor: store.currentList && store.currentList._id===list._id ? '#143C9A': list.published? '#0e2c74' : '#1a4072' ,color:'white'}}
            expanded={store.currentList && store.currentList._id === list._id ?(expanded === 'panel' ):false}
            onChange={handleChange('panel',list._id)}
            >
              <AccordionSummary
              style={{display:'flex' , alignItems:'flex-end'}} 
              expandIcon={<KeyboardDoubleArrowDownIcon style={{marginBottom:'1rem'}}/>}
              aria-controls="panel1bh-content"
              id="panel1bh-header">
                {list.published ? <PublishedCard key={list._id} List={list} />: <ListCard  key={list._id} List={list} />}
              </AccordionSummary>
              <AccordionDetails>
                    {list.published ? <PublishedArea userName={list.owner} key={list._id} id={list._id}/>: <WorkspaceScreen key={list._id} id={list._id}/>}
              </AccordionDetails>
            </Accordion>
            ))
          }
        </List>
      }
   
    return (
          <div id="home-screen">
            <AppBanner/>
                <div className="home-main">
                  <AppTools published={false}/>
                  <div className='home-content'>
                    <div className='list-parent'>{Lists}</div>
                    <div className='player-comments'>
                      <ButtonGroup className='buttonGroup'>
                        <ThemeProvider theme={theme}>
                            <Button onClick={togglePlayer} color="primary"  variant={playerVariant} >Player</Button>
                            <Button onClick={toggleComments} disabled={!store.currentList || (store.currentList && !store.currentList.published)} color="primary" variant={commentsVariant}>Comments</Button>
                        </ThemeProvider>
                      </ButtonGroup>
                      {content=="player"?<VideoPlayer/>:<Comments/>}
                    </div>
                    <div className="add-button"style={{marginTop:'4rem'}} >
                      <Fab
                          aria-label="add"
                          id="add-list-button"
                          size='medium'
                          onClick={handleCreateNewList}
                      >
                          <AddIcon />
                      </Fab>
                    </div>
                  </div>
                </div>
            <MUIDeleteModal/>
            <MUIAccessErrorModal/>
            {modalJSX}
          </div>)
}
export default HomeScreen;