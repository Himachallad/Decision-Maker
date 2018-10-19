import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./Login/Login";
import Content from "./Content/Content";

class App extends Component {
  render() {
    console.log("routing");
    console.log(this);
    return (
      <div className="decisionMaker">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/content" component={Content} />
            <Route component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
