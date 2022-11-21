import React, { useContext, useEffect,useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
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
    const [playerVariant, setPlayerVariant] = useState("outlined");
    const [commentsVariant, setCommentsVariant] = useState("contained");

    useEffect(() => {
        store.loadIdNamePairs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    let togglePlayer = ()=>{
            setPlayerVariant("contained");
            setCommentsVariant("outlined");
            setSelection(<Comments/>);
    }
    let toggleComments =()=>{
        setPlayerVariant("outlined");
            setCommentsVariant("contained");
            setSelection(<VideoPlayer/>);

    }
            
        
    

    //// Home Screen Loading 
    let Lists = "";
    if (store) {
        Lists = 
            <List sx={{ width: '90%', left: '5%'}}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    if(store.search){
       let filtered=  store.idNamePairs.filter((pair) => pair.name.includes(store.search))
        Lists = 
            <List sx={{ width: '90%', left: '5%'}}>
            {
              filtered.map((pair) => (
                <ListCard
                    key={pair._id}
                    idNamePair={pair}
                    selected={false}
                />
            ))
            }
            </List>;
    }
    //// Home Screen Loading END
    
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
                <MUIDeleteModal />
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
        </div>)
}

export default HomeScreen;