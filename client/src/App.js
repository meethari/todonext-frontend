import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Splash from 'pages/Splash'
import TodoApp from 'pages/TodoApp'
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
    </Switch>
  </Router>
  
)


export default App;
