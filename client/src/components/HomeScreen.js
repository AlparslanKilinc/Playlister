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

const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [selection, setSelection] = useState(0);
    const [variant, setVariant] = useState(0);

    useEffect(() => {
        store.loadIdNamePairs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    
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

    /// Selection 
    let interaction = <VideoPlayer/>
    
    return (
        <div id="home-screen">
            <AppTools/>
            <div className="home-main">
                <div className='list-area'>
                    {Lists}
                </div>
                <div className='player-comments'>
                <ButtonGroup className='buttonGroup'>
                    <Button style={{border:'black solid 1px' , color:'#071935'}} variant="outlined" >Player</Button>
                    <Button style={{backgroundColor:'#071935',color:'white'}} variant="contained">Comments</Button>
                </ButtonGroup>
                {interaction}
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