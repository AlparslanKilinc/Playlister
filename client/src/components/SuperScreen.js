import React, { useEffect ,useContext,useState} from 'react'
import AllListScreen from './AllListScreen';
import HomeScreen from './HomeScreen';
import UserScreen from './UserScreen';
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'

export const SuperScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    let selection="";

    useEffect(() => {
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[store.currentScreen]);


    if(store.currentScreen==="HomeScreen" || auth.loggedIn){
        selection=<HomeScreen/>;
    }

    if(store.currentScreen==="AllListScreen" || !auth.loggedIn){
        selection=<AllListScreen/>;
        if(store.currentScreen==="HomeScreen") store.setScreen("AllListScreen");
    }

    if(store.currentScreen==="UserScreen"){
        selection=<UserScreen/>;
        if(store.currentScreen==="HomeScreen") store.setScreen("UserScreen");
    }

   
    
   
    
  return (
    <div>
        {selection}
    </div>
  )
}

export default SuperScreen;
