import React, { Component } from "react";
import "./Admin.css";
import axios from "axios";

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      username: null,
      password: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  login = () => {
    const username = this.state.username;
    const password = this.state.password;
    axios
      .post("/api/login", {
        username: username,
        password: password
      })
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(error => {
        this.setState({ message: this.getMessage(error) });
        console.log(error);
      });
    this.setState({ message: null });
  };
  logout = () => {
    axios.post("/api/logout").then(res => {
      console.log(res);
      this.setState({ user: null });
    });
  };

  handleChange(key, e) {
    this.setState({ [key]: e.target.value });
  }

  getMessage = error =>
    error.response
      ? error.response.data
        ? error.response.data.message
        : JSON.stringify(error.response.data, null, 2)
      : error.message;

  render() {
    return this.state.user ? (
      <div className="admin">
        <h2>Hello, Admin</h2>
        <h4>Users: </h4>
        <h4>Products </h4>
        <button className="logout" onClick={this.logout}>
          Logout
        </button>
      </div>
    ) : (
      <div className="admin">
        <h1>Admin Login</h1>
        <p>{this.state.message && this.state.message}</p>
        UserName:
        <input onChange={e => this.handleChange("username", e)} />
        Password:
        <input
          onChange={e => this.handleChange("password", e)}
          type="password"
        />
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}
export default Admin;
