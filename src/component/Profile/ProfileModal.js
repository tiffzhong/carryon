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
      instagram: ""
    };
  }

  componentDidMount() {
    this.setState({
      city: this.props.city,
      about: this.props.about,
      twitter: this.props.twitter,
      instagram: this.props.instagram
    });
  }

  createProfile = () => {
    const { city, about, twitter, instagram } = this.props;
    axios
      .post("/api/profile", { city, about, twitter, instagram })
      .then(res => {})
      .catch(error => error, "error in createprofile");
  };
  editProfile = (city, about, twitter, instagram) => {
    axios
      .put("/api/profile", { city, about, twitter, instagram })
      .then(() => {})
      .catch(error => error, "error in edit profile");
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onSubmit = event => {
    event.preventDefault();
  };

  render() {
    const { city, about, twitter, instagram } = this.props;
    console.log(this.props, "let me see props");
    const showHideClassName = this.props.display
      ? "modal display-block"
      : "modal display-none";

    return (
      <>
        <div className={showHideClassName}>
          <form className="modal-form" onSubmit={event => this.onSubmit(event)}>
            Current City:{" "}
            <input
              placeholder="Add Current City"
              value={this.state.city}
              name="city"
              onChange={event => this.handleChange(event)}
              type="text"
            />
            About Me:
            <textarea
              placeholder="Write some details about yourself"
              name="about"
              value={this.state.about}
              onChange={event => this.handleChange(event)}
              type="text"
            />
            Twitter Link:
            <input
              placeholder="Add Twitter"
              name="twitter"
              onChange={event => this.handleChange(event)}
              type="text"
              value={this.state.twitter}
            />
            Instagram:
            <input
              placeholder="Add Instagram"
              name="instagram"
              onChange={event => this.handleChange(event)}
              type="text"
              value={this.state.instagram}
            />
            <button
              onClick={() => {
                this.createProfile(
                  this.state.city,
                  this.state.about,
                  this.state.twitter,
                  this.state.instagram
                );
                this.editProfile(
                  this.state.city,
                  this.state.about,
                  this.state.twitter,
                  this.state.instagram
                );
              }}
            >
              Save Changes
            </button>
            <button
              className="modal-close-button"
              onClick={this.props.hideModal}
            >
              X
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default ProfileModal;
