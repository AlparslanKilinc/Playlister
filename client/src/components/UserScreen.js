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


const UserScreen = () => {
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


    return (
        <div id="home-screen">
            <AppTools published={true}/>
            <div className="home-main">
                <ListArea/>
                <div className='player-comments'>
                <ButtonGroup className='buttonGroup'>
                <ThemeProvider theme={theme}>
                    <Button onClick={togglePlayer} color="primary"  variant={playerVariant} >Player</Button>
                    <Button onClick={toggleComments} color="primary" variant={commentsVariant}>Comments</Button>
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