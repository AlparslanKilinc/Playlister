import React, { useEffect ,useContext,useState} from 'react'
import AllListScreen from './AllListScreen';
import HomeScreen from './HomeScreen';
import UserScreen from './UserScreen';
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'

export const SuperScreen = (props) => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const[screen,setScreen]=useState(store.currentScreen);

    useEffect(() => {
        setScreen(store.currentScreen);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[store.currentScreen]);

    let selection = "";
    if(screen==="HomeScreen" && auth.loggedIn){
        selection=<HomeScreen/>
    }else{
        selection=<AllListScreen/>;
    }
    if(screen==="AllListScreen"){
        selection=<AllListScreen/>
    }if(screen==="UserScreen"){
        selection=<UserScreen/>
    }
    
  return (
    <div>
        {selection}
    </div>
  )
}

export default SuperScreen;
