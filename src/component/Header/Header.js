import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../ducks/blogpostReducer";

import logo from "./logo.png";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      toggle: false
    };
  }

  componentDidMount() {
    axios.get("/auth/user-data").then(response => {
      this.props.setUser(response.data.user);
    });
  }

  login() {
    const redirectUri = encodeURIComponent(
      window.location.origin + "/auth/callback"
    );
    window.location = `https://${
      process.env.REACT_APP_AUTH0_DOMAIN
    }/authorize/?client_id=${
      process.env.REACT_APP_AUTH0_CLIENT_ID
    }&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
  }

  logout = () => {
    axios.post("/auth/logout").then(() => {
      this.props.setUser(null);
      console.log("logging out");
    });
  };
  redirectToLandingPage() {
    window.location.pathname = "/";
  }
  toggle = () => {
    this.setState(prevState => {
      return {
        toggle: !prevState.toggle
      };
    });
  };

  render() {
    const { user } = this.props;
    return (
      <header>
        {user ? (
          <div className="logged-in-header">
            <Link to="/dashboard">
              <img src={logo} width={60} mode="fit" alt="logo" />
            </Link>

            <div className="links">
              <div>
                <button onClick={this.toggle}>☰</button>
              </div>
              <ul className={this.state.toggle ? "show" : "hide"}>
                <Link to={`/profile/${user.id}`}>
                  <li>Profile</li>
                </Link>
                <Link to="/dashboard">
                  <li>Dashboard</li>
                </Link>

                <Link to="/new">
                  <li>New Post</li>
                </Link>
                <Link to="/shop">
                  <li>Shop</li>
                </Link>
                <li
                  onClick={() => {
                    this.logout();
                    this.redirectToLandingPage();
                  }}
                >
                  Logout
                </li>
                <Link to="/shoppingcart">
                  <li>
                    <i class="fas fa-shopping-cart" />
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        ) : (
          <div className="logged-out-header">
            <Link to="/">
              <img src={logo} width={60} mode="fit" alt="logo" />
            </Link>
            <button className="toggle-symbol" onClick={this.toggle}>
              ☰
            </button>
            <div className="links">
              <ul className={this.state.toggle ? "show" : "hide"}>
                <Link to="/shop">
                  <li>Shop</li>
                </Link>

                <li onClick={() => this.login()}>Register/Login</li>
                <Link to="/shoppingcart">
                  <li>
                    <i class="fas fa-shopping-cart" />
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        )}
      </header>
    );
  }
}

function mapStateToProps(state) {
  let { user } = state.blogpost;

  return {
    user
  };
}

export default connect(
  mapStateToProps,
  { setUser }
)(Header);
