import React, { Component } from "react";
import Banner from "../Banner/Banner";

class LandingPage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="landing-page-container">
        <Banner />
      </div>
    );
  }
}

export default LandingPage;
