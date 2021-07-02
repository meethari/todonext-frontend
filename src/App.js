import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Splash from 'pages/Splash'
import TodoApp from 'pages/TodoApp'
import Login from 'pages/Login'
import Register from 'pages/Register'
import {AuthContext, useAuth} from 'context/Auth'
import axios from 'axios'
import 'App.css';

const Logout = () => {

  const {authTokens, setAuthTokens} = useAuth()

  useEffect (() => {

    const someFunction = async () => {
      const response = await axios.post('/logout')
      setAuthTokens(false)
    } 
    someFunction()
    
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
      <Router>
        <Switch>
          <Route exact path="/">
            {authTokens ? <TodoApp/> : <Splash/>}
          </Route> 
          <Route path="/app">
            <TodoApp/>
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
    </AuthContext.Provider>
  )
}


export default App;
