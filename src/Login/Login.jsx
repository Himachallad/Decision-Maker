import React, { Component } from "react";

class Login extends React.Component {
  render() {
    if (this.props.location.pathname != "/login") {
      this.props.history.push("/login");
    }
    return <div>Login Page</div>;
  }
}

export default Login;
