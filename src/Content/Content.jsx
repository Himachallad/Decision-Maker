import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button
} from "@material-ui/core";
import "../Content/Content.css";
import logo from "../images/Logo.png";
import StatementWithFactor from "./StatementWithFactor";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      pageTitle: "Pros",
      dataSubmitted: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  saveAndContinue = () => {
    console.log("Data saved for" + this.state.pageTitle);
    this.setState({
      pageTitle: "Cons"
    });
  };

  done = () => {
    console.log("Data saved for" + this.state.pageTitle);
    this.setState({
      dataSubmitted: true
    });
  };

  render() {
    return (
      <div className="content">
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>{"Make your move"}</DialogTitle>
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
        </div>
        <div className="body">
          {this.state.dataSubmitted ? (
            "Thank you, Algo for decision in construction"
          ) : (
            <StatementWithFactor
              pageTitle={this.state.pageTitle}
              saveAndContinue={this.saveAndContinue}
              done={this.done}
            />
          )}
          }
        </div>
      </div>
    );
  }
}

export default Content;
