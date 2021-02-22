import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Splash from 'pages/Splash'
import TodoApp from 'pages/TodoApp'
import Login from 'pages/Login'
import Register from 'pages/Register'
import {AuthContext} from 'context/Auth'
import 'App.css';


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
            <Splash/>
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
        </Switch>
      </Router>
    </AuthContext.Provider>
  )
}


export default App;
