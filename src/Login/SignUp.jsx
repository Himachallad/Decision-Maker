import React from 'react';
import './SignUp.css';
import axios from 'axios';
import mailValidator from '../common/MailValidator';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      mailId: '',
      phone: '',
      password: '',
      validName: '',
      validMail: '',
      validPhone: '',
      validPassword: '',
    };
  }

  changeName = (elem) => {
    var name = elem.target.value;
    this.setState({
      name,
      validName: name ? 'true' : 'false',
    });
  };

  changeMailId = (elem) => {
    var mailId = elem.target.value;
    this.setState({
      mailId,
      validMail: mailValidator(mailId) ? 'true' : 'false',
    });
  };

  changePhoneNo = (elem) => {
    var phone = elem.target.value;

    this.setState({
      phone,
      validPhone: !isNaN(phone) && phone > 0 ? 'true' : 'false',
    });
  };

  changePassword = (elem) => {
    var password = elem.target.value;
    this.setState({
      password,
      validPassword: password ? 'true' : 'false',
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

  validateSignUp = (name, mailId, phone) => {
    if (name && mailValidator(mailId) && !isNaN(phone) && phone > 0) {
      return true;
    }
    return false;
  };

  submit = () => {
    var { name, mailId, phone, password } = this.state;
    if (this.validateSignUp(name, mailId, phone)) {
      var data = {
        name,
        email: mailId,
        receivedPassword: password,
      };
      this.submitNewUser(data).then((resolve) => {
        if (resolve) {
          this.props.signUpComplete();
        }
      });
    }
  };

  invalidCheck = (data) => {
    if (data === 'false') {
      return <div class="red">Looks bad!</div>;
    } else {
      return <div />;
    }
  };

  render() {
    var { validMail, validName, validPassword, validPhone } = this.state;
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
          {validName === 'true' ? (
            <div class="green">Looks good!</div>
          ) : (
            this.invalidCheck(validName)
          )}
          <div className="mail" required={true}>
            Mail Id
          </div>
          <input
            className="addNewUserInput"
            type="email"
            onChange={this.changeMailId}
          />
          {validMail === 'true' ? (
            <div class="green">Looks good!</div>
          ) : (
            this.invalidCheck(validMail)
          )}
          <div className="phone">Phone no</div>
          <input
            className="addNewUserInput"
            type="text"
            onChange={this.changePhoneNo}
          />
          {validPhone === 'true' ? (
            <div class="green">Looks good!</div>
          ) : (
            this.invalidCheck(validPhone)
          )}
          <div className="password">Password</div>
          <input
            className="addNewUserInput"
            type="password"
            onChange={this.changePassword}
          />
          {validPassword === 'true' ? (
            <div class="green">Looks good!</div>
          ) : (
            this.invalidCheck(validPassword) 
          )}
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
