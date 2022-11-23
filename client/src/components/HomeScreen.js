import React, { useContext, useEffect,useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
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



const HomeScreen = () => {
    const theme = createTheme({
        palette: {
          primary: {
            main: '#071935',
            darker: '#1565c0',
          },
        },
      });
      
    const { store } = useContext(GlobalStoreContext);
    const [selection, setSelection] = useState(<VideoPlayer/>);
    const [playerVariant, setPlayerVariant] = useState("contained");
    const [commentsVariant, setCommentsVariant] = useState("outlined");
    store.history = useHistory();

    useEffect(() => {
        store.LoadPlaylists();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    /// Accordion 
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel,id) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
      store.clearTransaction();
      store.setCurrentList(id);
    };

   

    function handleCreateNewList() {
        setExpanded(false);
        store.createNewList();
    }

    let togglePlayer = ()=>{
            setPlayerVariant("contained");
            setCommentsVariant("outlined");
            setSelection(<VideoPlayer/>);
           
    }
    let toggleComments =()=>{
            setPlayerVariant("outlined");
            setCommentsVariant("contained");
            setSelection(<Comments/>);
    }

    //// Editing Functions 
        
    let Lists = "";
    if (store.playlists) {
        Lists = 
        <List sx={{width: '90%', left: '5%'}}>
        {
            store.playlists.map((list,id=0) => (
            <Accordion key={list._id} id='user-list' expanded={expanded === 'panel'+id+1 && store.currentList} onChange={handleChange('panel'+id+1,list._id)}>
                <AccordionSummary
                expandIcon={<KeyboardDoubleArrowDownIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                {list.published ? <PublishedCard key={list._id} List={list} selected={false}/>: <ListCard key={list._id} List={list} selected={false}/>}
                </AccordionSummary>

                <AccordionDetails>
                    {list.published ? <PublishedArea key={list._id} id={list._id}/>: <WorkspaceScreen key={list._id} id={list._id}/>}
                </AccordionDetails>

            </Accordion>
            ))
       }
    </List>
    }
   
    return (
        <div id="home-screen">
            <AppTools/>
            <div className="home-main">
                <div className='list-area'>
                    {Lists}
                </div>
                <div className='player-comments'>
                <ButtonGroup className='buttonGroup'>
                <ThemeProvider theme={theme}>
                    <Button onClick={togglePlayer} color="primary"  variant={playerVariant} >Player</Button>
                    <Button onClick={toggleComments}  color="primary" variant={commentsVariant}>Comments</Button>
                    </ThemeProvider>
                </ButtonGroup>
                {selection}
                </div>
                
            </div>

            <div className="home-footer">
            <Fab 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </div>
            <MUIDeleteModal/>
        </div>)
}



export default HomeScreen;