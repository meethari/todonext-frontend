import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import SiteNavbar from 'components/SiteNavbar/SiteNavbar';
import Splash from 'pages/Splash/Splash'
import TaskManagerPage from 'pages/TaskManagerPage/TaskManagerPage'
import Login from 'pages/Login'
import Register from 'pages/Register'
import {AuthContext, useAuth} from 'context/Auth'
import Api from 'utilities/api';
import 'App.css';

const Logout = () => {

  const {authTokens, setAuthTokens} = useAuth()

  useEffect (() => {
    setAuthTokens(false)
  }, [])
  
  return (authTokens ? <p>Logging out</p> : <Redirect to="/"/>)
}


const App = () => {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <div className="app">
        <Router>
          <SiteNavbar/>
          <Switch>
            <Route exact path="/">
              {authTokens ? <TaskManagerPage/> : <Splash/>}
            </Route> 
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/register">
              <Register/>
            </Route>
            <Route path="/logout">
              <Logout/>
            </Route>
          </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  )
}


export default App;
