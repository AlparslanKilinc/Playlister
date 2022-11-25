import React, { useContext, useEffect,useState } from 'react'
import { GlobalStoreContext } from '../store'
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
import PublishedCard from './PublishedCard';
import { useHistory } from 'react-router-dom'
import PublishedArea from './PublishedArea';
import MUIDeleteModal from './MUIDeleteModal';
import AuthContext from '../auth'


const UserScreen = () => {
    const theme = createTheme({
        palette: {
          primary: {
            main: '#071935',
            darker: '#1565c0',
          },
        },
      });
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [selection, setSelection] = useState(<VideoPlayer/>);
    const [playerVariant, setPlayerVariant] = useState("contained");
    const [commentsVariant, setCommentsVariant] = useState("outlined");
    store.history = useHistory();

    useEffect(() => {
        store.LoadPublishedPlaylists();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    /// Accordion 
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel,id) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
      store.clearTransaction();
      store.setPublishedList(id);
    };

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
    if (store.PublishedPlaylists) {
      let playlists=store.PublishedPlaylists;
      /// Search by UserName
      if(store.search!==""){
        playlists= playlists.filter( list => list.owner.startsWith(store.search));
      }
      /// Sorting 
      switch (store.sortMethod) {
          case 'Name':
            console.log('Sort By Name');
            playlists=store.SortName(playlists);
            break;
          case 'PublishedDate':
            playlists=store.SortPublishedDate(playlists);
          console.log('Sort By Published');
          break;
          case 'Listens':
              console.log('Sort By Listens');
          break;
          case 'Likes':
            console.log('Sort by Likes');
            break;
          case 'Dislikes':
              console.log('Sort by Dislikes');
              break;
          default:
            console.log("Sort Method null");
      }

        Lists = 
        <List sx={{width: '90%', left: '5%'}}>
        {
            playlists.map((list,id=0) => (
              
            <Accordion key={list._id} id='user-list' expanded={expanded == 'panel'+(id+1).toString() && store.currentList} onChange={handleChange('panel'+(id+1).toString(),list._id)}>
                <AccordionSummary
                expandIcon={<KeyboardDoubleArrowDownIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                {list.published ? <PublishedCard key={list._id} List={list} selected={false}/>:""}
                </AccordionSummary>

                <AccordionDetails>
                    {list.published ? <PublishedArea key={list._id} userName={list.owner} id={list._id}/>:""}
                </AccordionDetails>

            </Accordion>
            ))
       }
    </List>
    }
   
    return (
        <div id="home-screen">
            <AppTools published={true}/>
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
                <Typography variant="h2"> {store.search} Lists</Typography>
            </div>
            <MUIDeleteModal/>
        </div>)
}



export default UserScreen;