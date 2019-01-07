import React, { Component } from "react";
import "./Profile.css";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../ducks/blogpostReducer";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: []
    };
  }
  componentDidMount() {
    this.newQuote();
    axios.get("/auth/user-data").then(response => {
      this.props.setUser(response.data.user);
    });
  }
  newQuote = id => {
    let randomid = Math.floor(Math.random() * (32 - 1) + 1);
    axios.get(`/api/abquote/${randomid}`).then(res => {
      console.log("res data", res.data);
      this.setState({
        quote: res.data.quote
      });
    });
  };
  render() {
    console.log("props", this.props.user);
    console.log("this.quote", this.state.quote);
    const { user } = this.props;
    return (
      <div className="profile-container">
        <div className="profile-banner">
          <h2>Profile</h2>
        </div>
        {user ? (
          <div className="profile-picture">
            <img src={this.props.user.picture} alt="provided by auth0" />
            <h1>Welcome back, {this.props.user.name}!</h1>
          </div>
        ) : (
          <div className="profile-picture">
            <img
              src="https://ebus.ca/wp-content/uploads/2017/08/profile-placeholder.jpg"
              alt=""
            />
            <h1>Welcome!</h1>
          </div>
        )}

        <h5>{this.state.quote}</h5>
        <h6>-Anthony Bourdain</h6>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}
export default connect(
  mapStateToProps,
  { setUser }
)(Profile);
