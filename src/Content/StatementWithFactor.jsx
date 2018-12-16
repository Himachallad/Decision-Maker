import React from 'react';
import { Input, Button } from '@material-ui/core';

export default class StatementWithFactor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      statement: '',
      factor: '',
      totalCount: 0,
      sumFactor: 0,
    };
  }

  componentDidMount() {
    document.title = this.props.pageTitle;
  }

  onEnter = (elem) => {
    var statement = this.state.statement;
    var factor = this.state.factor;
    if (elem.key === 'Enter' && statement && factor) {
      var data = this.state.data;
      data.push({
        statement: statement,
        factor: factor,
      });
      this.setState({
        rerender: true,
        statement: '',
        factor: '',
      });
    }
  };

  setStatement = (e) => {
    this.setState({
      statement: e.target.value,
    });
  };

  setFactor = (e) => {
    var factor = parseInt(e.target.value, 10);
    if (Number.isInteger(factor) && factor >= 0 && factor <= 10) {
      this.setState({
        factor: factor,
      });
    } else {
      this.setState({
        factor: '',
      });
    }
  };

  saveAndContinue = () => {
    var { data, statement, factor } = this.state;
    console.log(data);
    var sumFactor = 0,
      totalCount = 0;
    if (
      this.props.pageTitle === 'Pros' &&
      ((statement && factor) || (!statement && !factor))
    ) {
      if (statement && factor) {
        data.push({
          statement: statement,
          factor: factor,
        });
      }
      if (data.length > 0) {
        data.forEach((elem) => {
          totalCount++;
          sumFactor += elem.factor;
        });
        if (sumFactor > 0) document.title = 'Cons';
        this.props.saveAndContinue({ sumFactor, totalCount });
      }
      this.setState({
        data: [],
        statement: '',
        factor: '',
      });
    } else if ((statement && factor) || (!statement && !factor)) {
      if (statement && factor) {
        data.push({
          statement: statement,
          factor: factor,
        });
      }
      if (data.length > 0) {
        data.forEach((elem) => {
          totalCount++;
          sumFactor += elem.factor;
        });
        this.props.done({ sumFactor, totalCount });
      }
    }
  };

  render() {
    var form = [];
    var i = 0;
    this.state.data.forEach((elem) => {
      if (elem) {
        form.push(
          <Input
            key={i}
            value={elem.statement}
            onChange={this.setStatement}
            onKeyPress={this.onEnter}
            className="statement"
          />,
        );
        form.push(
          <Input
            key={i + 1}
            value={elem.factor}
            onKeyPress={this.onEnter}
            onChange={this.setFactor}
            className="factor"
          />,
        );
        form.push(<br />);
        i += 2;
      }
    });
    i++;
    form.push(
      <Input
        key={i}
        placeholder={'Enter your ' + this.props.pageTitle}
        onChange={this.setStatement}
        value={this.state.statement}
        onKeyPress={this.onEnter}
        className="statement"
      />,
    );
    form.push(
      <Input
        key={i + 1}
        placeholder="Rate out of 10"
        onKeyPress={this.onEnter}
        onChange={this.setFactor}
        value={this.state.factor}
        className="factor"
      />,
    );

    return (
      <div className="pros">
        <div className="formHeader">
          Fill in the details and enter to add more
        </div>
        <div className="prosForm">{form}</div>
        <Button
          variant="contained"
          color="primary"
          className="nextPage"
          onClick={this.saveAndContinue}
        >
          Next
        </Button>
      </div>
    );
  }
}
