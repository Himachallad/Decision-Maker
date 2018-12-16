import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import Content from './Content/Content';
import SignUp from './Login/SignUp';
import { getToken, logout } from './Authentication/AuthService';

const PrivateRoute = ({ component: Page, ...rest }) => {
  const componentObject = { component: Page, ...rest };
  const componentPath = componentObject.path;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (getToken()) {
          if (componentPath === '/logout') {
            logout();
          }
          return <Page {...props} />;
        }

        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

class App extends Component {
  render() {
    return (
      <div className="decisionMaker">
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/content" component={Content} />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute path="/logout" component={Login} />
            <PrivateRoute component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
