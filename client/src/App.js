import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'
import {
    AppBanner,
    HomeWrapper,
    LoginScreen,
    RegisterScreen,
    AllListScreen,
    SplashScreen,
    HomeScreen,
} from './components'

const App = () => {   
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <GlobalStoreContextProvider>              
                    <AppBanner />
                    <Switch>
                        <Route path="/" exact component={HomeWrapper} />
                        <Route path="/login/" exact component={LoginScreen} />
                        <Route path="/register/" exact component={RegisterScreen} />
                        <Route path="/AllLists/" exact component={AllListScreen} />
                        <Route path="/Users/" exact component={AllListScreen} />
                    </Switch>
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App