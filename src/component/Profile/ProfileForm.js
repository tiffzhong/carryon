import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import axios from "axios";
class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutMe: "",
      twitter: "",
      instagram: ""
    };
  }

  componentDidMount() {
    this.setProfile();
  }
  setProfile = id => {
    axios.get(`/api/profile/${id}`).then(res => {
      console.log("response data", res);
      this.setState({
        aboutMe: res.data,
        twitter: res.data,
        instagram: res.data
      });
    });
  };

  render() {
    const { user } = this.props;
    return (
      <>
        <div className="profile-banner2">
          <h2>Profile Edit</h2>
        </div>
        <div className="profileedit-container">
          <form>
            About Me:
            <textarea />
            Twitter Link: <input />
            Instagram: <input />
          </form>
          <Link to={`/profile/2`}>
            <button>Save Changes</button>
          </Link>
        </div>
      </>
    );
  }
}

export default ProfileForm;
