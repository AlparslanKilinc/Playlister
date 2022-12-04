import { useContext } from 'react'
import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'
import SuperScreen from './SuperScreen';
import { GlobalStoreContext } from '../store'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    if (auth.loggedIn || store.user==="Guest"){
        return <SuperScreen/>
    } 
    else return <SplashScreen/>
}