import React, { Component } from "react";
import "./Profile.css";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../ducks/blogpostReducer";
import { Link } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      picture: "",
      aboutMe: "",
      twitter: "",
      instagram: "",
      quote: []
    };
  }
  componentDidMount() {
    this.setProfile();
    this.newQuote();
    axios.get("/auth/user-data").then(response => {
      this.props.setUser(response.data.user);
    });
  }

  newQuote = id => {
    let randomid = Math.floor(Math.random() * (32 - 1) + 1);
    axios.get(`/api/abquote/${randomid}`).then(res => {
      this.setState({
        quote: res.data.quote
      });
    });
  };

  setProfile = id => {
    axios.get(`/api/profile/${this.props.match.params.id}`).then(res => {
      console.log("setprofile response data", res.data);
      this.setState({
        name: res.data.name,
        picture: res.data.picture,
        aboutMe: res.data.about_me,
        twitter: res.data.twitter,
        instagram: res.data.instagram
      });
    });
  };

  createProfile = (about_me, twitter, instagram) => {
    axios
      .post("/api/profile", { about_me, twitter, instagram })
      .then(() => (window.location.pathname = "/profile"))
      .catch(error => error, "error in createprofile");
  };

  render() {
    const { user } = this.props;
    console.log(this.props.match, "MATCHHH");
    return (
      <>
        <div className="profile-banner">
          <h2>Profile</h2>
        </div>
        <div className="profile-container">
          {user ? (
            <div className="profile-picture">
              <img src={this.state.picture} alt="provided by auth0" />
              <h1>Welcome back, {this.state.name}!</h1>
              <h5>About Me: {this.state.aboutMe}</h5>
              <h6>Twitter: {this.state.twitter}</h6>
              <h6>instagram: {this.state.instagram}</h6>
              <Link to={`/editprofile/${this.props.match.params.id}`}>
                <button>Edit Profile</button>
              </Link>
            </div>
          ) : (
            <div className="profile-picture">
              <img
                src="https://ebus.ca/wp-content/uploads/2017/08/profile-placeholder.jpg"
                alt=""
              />
              <h2>Welcome! Please Sign In to see your profile</h2>
            </div>
          )}

          <h5>{this.state.quote}</h5>
          <h6>-Anthony Bourdain</h6>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    blogpost: state.blogpost
  };
}
export default connect(
  mapStateToProps,
  { setUser }
)(Profile);
