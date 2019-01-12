import React, { Component } from "react";
import "./Profile.css";
import axios from "axios";

class ProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      about: "",
      twitter: "",
      instagram: "",
      display: false
    };
  }

  createProfile = () => {
    const { city, about, twitter, instagram } = this.props;
    axios
      .post("/api/profile", { about, twitter, instagram })
      .then(res => {})
      .catch(error => error, "error in createprofile");
  };

  handleChange(event) {
    this.setState({ [event.target.value]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { city, about, twitter, instagram } = this.props;
    return (
      <>
        <div className="profile-modal">
          <form onSubmit={event => this.onSubmit(event)}>
            Current City:{" "}
            <input
              placeholder="Add Current City"
              name="city"
              onChange={event => this.handleChange(event)}
              type="text"
              value={city}
            />
            About Me:
            <textarea
              placeholder="Write some details about yourself"
              name="about"
              onChange={event => this.handleChange(event)}
              type="text"
              value={about}
            />
            Twitter Link:
            <input
              placeholder="Add Twitter"
              name="twitter"
              onChange={event => this.handleChange(event)}
              type="text"
              value={twitter}
            />
            Instagram:
            <input
              placeholder="Add Instagram"
              name="instagram"
              onChange={event => this.handleChange(event)}
              type="text"
              value={instagram}
            />
          </form>
          <button onClick={() => this.createProfile(about, twitter, instagram)}>
            Save Changes
          </button>
          <button className="modal-close-button" onClick={this.props.hideModal}>
            X
          </button>
        </div>
      </>
    );
  }
}

export default ProfileModal;
