import './App.css';
import { React } from 'react'
import { HashRouter, Route, Switch} from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'

import {
    AppBanner,
    LoginScreen,
    RegisterScreen,
    AllListScreen,
    SplashScreen,
    HomeScreen,
    UserScreen,
} from './components'

const App = () => {   
    return (
        <HashRouter>
            <AuthContextProvider>
                <GlobalStoreContextProvider>         
                    <Switch>
                        <Route path="/home/" exact component={HomeScreen}/>
                        <Route path="/public/" exact component={AllListScreen}/>
                        <Route path="/users/" exact component={UserScreen}/>
                        <Route path="/login/" exact component={LoginScreen} />
                        <Route path="/register/" exact component={RegisterScreen} />
                        <Route path="/" exact component={SplashScreen} /> 
                    </Switch>
                     
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </HashRouter>
    )
}

export default App