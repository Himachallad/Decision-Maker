import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './Login.css';
import mailValidator from '../common/MailValidator';
import passwordValidator from '../common/PasswordValidator';
import Content from '../Content/Content';
import { Route } from 'react-router-dom';
import axios from 'axios';
import NewUser from './NewUser';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mailId: '',
      password: '',
      verified: false,
      newUser: false,
    };
  }

  setPassword = (elem) => {
    this.setState({
      password: elem.target.value,
    });
  };

  setMailId = (elem) => {
    this.setState({
      mailId: elem.target.value,
    });
  };

  signUpComplete = () => {
    // var promise = new Promise((resolve) => {
    //   this.setState(
    //     {
    //       newUser: false,
    //     },
    //     () => {
    //       resolve('success');
    //     },
    //   );
    // });
    // promise.then((resolve) => {
    //   if (resolve === 'success')
    //     NotificationManager.success('Succesfully added new user', '');
    // });
    this.setState(
      {
        newUser: false,
      },
      async () => {
        await NotificationManager.success(
          'Succesfully added new user',
          '',
          2000,
        );
      },
    );
  };

  async tryLogin(data) {
    var loginDone = false;
    await axios
      .post('http://localhost:8080/login', data)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          loginDone = true;
        }
      })
      .catch((error, res) => {
        alert('Something bad happened');
      });
    return loginDone;
  }

  addNewUser = () => {
    this.setState({
      newUser: true,
    });
  };

  verifyForm = () => {
    const { mailId, password } = this.state;
    const data = {
      email: mailId,
      receivedPassword: password,
    };
    this.tryLogin(data).then((loginSucess) => {
      if (mailValidator(mailId) && passwordValidator(password) && loginSucess) {
        this.props.history.replace('/content');
        this.setState({
          verified: true,
        });
      }
    });
  };

  render() {
    if (
      this.props.location.pathname !== '/login' &&
      this.props.location.pathname !== '/content'
    ) {
      this.props.history.replace('/login');
    }

    return !this.state.newUser ? (
      <React.Fragment>
        <NotificationContainer />
        <CssBaseline />
        <div className="loginContainer">
          {this.state.verified}
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
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit"
                  onClick={this.addNewUser}
                >
                  Add new user
                </Button>
              </form>
            </div>
          </Paper>
        </div>
      </React.Fragment>
    ) : (
      <NewUser signUpComplete={this.signUpComplete} />
    );
  }
}

export default Login;
