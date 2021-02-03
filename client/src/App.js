import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Splash from 'pages/Splash'
import TodoApp from 'pages/TodoApp'
import Login from 'pages/Login'
import Register from 'pages/Register'
import 'App.css';


const App = () => (
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
  
)


export default App;
