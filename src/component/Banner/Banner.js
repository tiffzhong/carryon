import React, { Component } from "react";
import "./Banner.css";
import NewsLetterModal from "../NewsLetterModal/NewsLetterModal";
class Banner extends Component {
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
  render() {
    return (
      <div className="banner-container">
        <div className="welcome-homepage">
          <span>Welcome to Carry On!</span>
          <p>
            A social platform for travel bloggers to post, share, and inspire.
          </p>
          <button onClick={() => this.login()}>Join the community!</button>
          <NewsLetterModal />
        </div>
      </div>
    );
  }
}

export default Banner;
