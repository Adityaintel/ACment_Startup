import React from 'react';
import {BrowserRouter as Router,Route,Switch}  from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <HomePage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
