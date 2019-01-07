import React from "react";
import "./Banner.css";
const Banner = props => {
  return (
    <div className="banner-container">
      <div>
        <h1>Welcome to carryon!</h1>
        <h3>A platform for travel bloggers to post, share, and inspire.</h3>
        <button>Join the worldwide community now!</button>
      </div>
    </div>
  );
};

export default Banner;
