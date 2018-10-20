import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Backdrop
} from "@material-ui/core";
import "../Content/Content.css";
import logo from "../images/Logo.png";
import Pros from "./Pros";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      nextPage: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div className="content">
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Make your move"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
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
          <img className="logo" src={logo} />
        </div>
        <div className="body">{this.state.nextPage ? "" : <Pros />}</div>
      </div>
    );
  }
}

export default Content;
