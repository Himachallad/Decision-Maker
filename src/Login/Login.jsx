import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import "./Login.css";
import mailValidator from "../common/MailValidator";
import passwordValidator from "../common/PasswordValidator";
import Content from "../Content/Content";
import { Route } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mailId: "",
      password: ""
    };
  }

  setPassword = elem => {
    this.setState({
      password: elem.target.value
    });
  };

  setMailId = elem => {
    this.setState({
      mailId: elem.target.value
    });
  };

  verifyForm = elem => {
    console.log("verified");
    const mailId = this.state.mailId;
    const password = this.state.password;

    if (mailValidator(mailId) && passwordValidator(password)) {
      console.log("Save data");
      this.props.history.replace("/content");
    } else {
      this.setState({
        mailId: "",
        password: ""
      });
    }
  };

  render() {
    if (
      this.props.location.pathname !== "/login" &&
      this.props.location.pathname !== "/content"
    ) {
      this.props.history.replace("/login");
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <div className="loginContainer">
          <Route path="/content" component={Content} />
          <Paper className="login">
            <div className="loginForm">
              <Avatar className="lockIcon">
                <LockIcon />
              </Avatar>
              <Typography component="h1" variant="h5" className="signIn">
                Sign in
              </Typography>
              <form>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input
                    id="email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={this.setMailId}
                    value={this.state.mailId}
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={this.setPassword}
                    value={this.state.password}
                  />
                </FormControl>
                <FormControlLabel
                  className="rememberMe"
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                  onClick={this.verifyForm}
                >
                  Sign in
                </Button>
              </form>
            </div>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
