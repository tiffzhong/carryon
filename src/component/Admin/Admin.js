import React, { Component } from "react";
import "./Admin.css";
import axios from "axios";

class Admin extends Component {
  state = {
    user: null,
    showRegister: false,
    message: null,
    fetchedDataMessage: null
  };

  getMessage = error =>
    error.response
      ? error.response.data
        ? error.response.data.message
        : JSON.stringify(error.response.data, null, 2)
      : error.message;

  register = () => {
    this.setState({ message: null });
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    axios
      .post("/admin/register", {
        username,
        password
      })
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(error => {
        this.setState({
          message: "Something went wrong w register: " + error
        });
      });
  };

  login = () => {
    this.setState({ message: null });
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    axios
      .post("/admin/login", {
        username,
        password
      })
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(error => {
        this.setState({
          message: "Something went wrong w login: " + this.getMessage(error)
        });
      });
  };

  logout = () => {
    axios
      .post("/admin/logout")
      .then(response => {
        this.setState({ user: null });
      })
      .catch(error => {
        this.setState({
          message: "Something went wrong w logout: " + this.getMessage(error)
        });
      });
  };

  render() {
    const { user, showRegister, message } = this.state;

    const inputFields = (
      <div>
        Username: <input ref="username" /> Password:{" "}
        <input type="password" ref="password" />{" "}
      </div>
    );

    return (
      <div className="App">
        <div className="login-banner" />
        {!user && (
          <div>
            <a
              href="javascript:void(0)"
              onClick={() => this.setState({ showRegister: false })}
            >
              Login
            </a>{" "}
            <a
              href="javascript:void(0)"
              onClick={() => this.setState({ showRegister: true })}
            >
              Register
            </a>
            <div className="login-or-register">
              {showRegister && (
                <div>
                  <h3>Register</h3>
                  {inputFields}
                  <button onClick={this.register}>Register</button>
                </div>
              )}
              {!showRegister && (
                <div>
                  <h3>Log in</h3>
                  {inputFields}
                  <button onClick={this.login}>Log in</button>
                </div>
              )}
              {message}
            </div>
          </div>
        )}
        {user && (
          <div className="user-info">
            <h2>Hello, Admin!</h2>
            <h4>Users: </h4>
            <h4>Products </h4>
            <button onClick={this.logout}>Log out</button>
          </div>
        )}
      </div>
    );
  }
}

export default Admin;
