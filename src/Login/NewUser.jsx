import React from 'react';
import './NewUser.css';
import axios from 'axios';

export default class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      mailId: '',
      phone: '',
      password: '',
    };
  }

  changeName = (elem) => {
    var name = elem.target.value;
    this.setState({
      name,
    });
  };

  changeMailId = (elem) => {
    var mailId = elem.target.value;
    this.setState({
      mailId,
    });
  };

  changePhoneNo = (elem) => {
    var phone = elem.target.value;
    this.setState({
      phone,
    });
  };

  changePassword = (elem) => {
    var password = elem.target.value;
    this.setState({
      password,
    });
  };

  async submitNewUser(data) {
    var submitDone = false;
    await axios
      .post('http://localhost:8080/addNewUser', data)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          submitDone = true;
        }
      })
      .catch((error, res) => {
        alert('Something bad happened');
      });
    return submitDone;
  }

  submit = () => {
    var { name, mailId, phone, password } = this.state;
    if (name && mailId && phone) {
      var data = {
        name,
        email: mailId,
        receivedPassword: password,
      };
      this.submitNewUser(data);
    }
  };

  render() {
    return (
      <div className="addNewUser">
        <div className="addUserHeader"> Sign up</div>
        <div className="addUserForm">
          <div className="name">Name</div>
          <input
            className="addNewUserInput"
            type="text"
            onChange={this.changeName}
          />
          <div className="mail">Mail Id</div>
          <input
            className="addNewUserInput"
            type="text"
            onChange={this.changeMailId}
          />
          <div className="phone">Phone no</div>
          <input
            className="addNewUserInput"
            type="text"
            onChange={this.changePhoneNo}
          />
          <div className="password">Password</div>
          <input
            className="addNewUserInput"
            type="password"
            onChange={this.changePassword}
          />
          <div className="submitWrapper flex">
            <div className="submitButton flex" onClick={this.submit}>
              Submit
            </div>
          </div>
        </div>
      </div>
    );
  }
}
