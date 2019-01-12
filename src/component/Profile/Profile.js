import React, { Component } from "react";
import "./Profile.css";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../ducks/blogpostReducer";
import ProfileModal from "./ProfileModal";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      picture: "",
      city: "",
      about: "",
      twitter: "",
      instagram: "",
      quote: [],
      id: null,
      display: false
    };
  }
  showModal = () => {
    this.setState({ display: true });
  };
  hideModal = () => {
    this.setState({ display: false });
  };

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
        id: res.data.id,
        name: res.data.name,
        picture: res.data.picture,
        city: res.data.city,
        about: res.data.about,
        twitter: res.data.twitter,
        instagram: res.data.instagram
      });
    });
  };

  render() {
    const { user } = this.props;
    console.log(this.props, "i wanna see");
    const profileInformation = (
      <ProfileModal
        display={this.state.display}
        city={this.state.city}
        about={this.state.about}
        twitter={this.state.twitter}
        instagram={this.state.instagram}
        hideModal={this.hideModal}
      />
    );
    return (
      <>
        {this.state.display ? profileInformation : null}

        <div className="profile-banner">
          <h2>Profile</h2>
        </div>
        <div className="profile-container">
          {user ? (
            <div className="profile-picture">
              <img src={this.state.picture} alt="provided by auth0" />
              <h1>Welcome back, {this.state.name}!</h1>
              <h5>
                <button onClick={this.showModal}>+</button>
                {this.state.city ? this.state.city : "Current City"}
                <br />
                About Me:
                {this.state.about
                  ? this.state.about
                  : "Write some details about yourself"}
              </h5>
              <h6>
                Twitter:
                {this.state.twitter ? this.state.twitter : "Add Twitter"}
              </h6>
              <h6>
                Instagram:
                {this.state.instagram ? this.state.instagram : "Add Instagram"}
              </h6>

              {/* <Link to={`/editprofile/${this.props.match.params.id}`}>
                <button>Create Profile</button>
              </Link>
              <Link to={`/editprofile/${this.props.match.params.id}`}>
                <button>Edit Profile</button>
              </Link> */}
            </div>
          ) : (
            <div className="profile-picture">
              <img src={this.state.picture} alt="provided by auth0" />
              <h1>{this.state.name}</h1>
              <h5>About Me: {this.state.about}</h5>
              <h6>Twitter: {this.state.twitter}</h6>
              <h6>instagram: {this.state.instagram}</h6>
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
