import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import Content from './Content/Content';
import SignUp from './Login/SignUp';

class App extends Component {
  render() {
    return (
      <div className="decisionMaker">
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/content" component={Content} />
            <Route path="/signup" component={SignUp} />
            <Route component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
