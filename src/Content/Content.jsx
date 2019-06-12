import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from '@material-ui/core';
import '../Content/Content.css';
import logo from '../images/Logo.png';
import StatementWithFactor from './StatementWithFactor';
import { Redirect } from 'react-router-dom';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      pageTitle: 'Pros',
      dataSubmitted: false,
      totalPros: 0,
      totalCons: 0,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  saveAndContinue = (total) => {
    var res = total.sumFactor / total.totalCount;
    this.setState({
      pageTitle: 'Cons',
      totalPros: res,
    });
  };

  done = (total) => {
    var res = total.sumFactor / total.totalCount;
    this.setState({
      dataSubmitted: true,
      totalCons: res,
    });
  };

  showResult = (totalPros, totalCons) => {
    if (totalPros > totalCons) {
      return <div>You can take this decision.</div>;
    } else if (totalPros < totalCons) {
      return <div>Looks like a wrong idea.</div>;
    } else {
      return (
        <div>
          Too close. Lets us toss a coin for you.
          {100 * Math.random() > 50
            ? ' Take this decision'
            : ' Looks like a wrong idea'}
        </div>
      );
    }
  };

  logout = () => {
    let path = 'logout';
    this.props.history.push(path);
  };

  render() {
    var { totalPros, totalCons } = this.state;
    return (
      <div className="content">
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>{'Make your move'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Having trouble, we will help you decide.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Decide
            </Button>
          </DialogActions>
        </Dialog>
        <div className="header">
          <img alt="logo" className="logo" src={logo} />
          <div className="logoutButton" onClick={this.logout}>
            Logout
          </div>
        </div>
        <div className="body">
          {this.state.dataSubmitted ? (
            this.showResult(totalPros, totalCons)
          ) : (
            <StatementWithFactor
              pageTitle={this.state.pageTitle}
              saveAndContinue={this.saveAndContinue}
              done={this.done}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Content;
