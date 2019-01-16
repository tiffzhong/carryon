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

  // createProfile = () => {
  //   const { city, about, twitter, instagram } = this.props;
  //   axios
  //     .post("/api/profile", { city, about, twitter, instagram })
  //     .then(res => {})
  //     .catch(error => error, "error in createprofile");
  // };
  editProfile = (user_id, city, about, twitter, instagram) => {
    console.log(this.props.user_id, "userid");
    axios
      .put(`/api/profile/${this.props.user_id}`, {
        city: this.state.city,
        about: this.state.about,
        twitter: this.state.twitter,
        instagram: this.state.instagram
      })
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
    console.log(this.state, "let me see stateeeeee");
    const showHideClassName = this.props.display
      ? "modal display-block"
      : "modal display-none";

    return (
      <>
        <div className={showHideClassName}>
          <form className="modal-form" onSubmit={event => this.onSubmit(event)}>
            Current City:
            <br />
            <input
              placeholder="Add Current City"
              value={this.state.city}
              name="city"
              onChange={event => this.handleChange(event)}
              type="text"
            />
            <br />
            About Me:
            <br />
            <textarea
              placeholder="Write some details about yourself"
              name="about"
              value={this.state.about}
              onChange={event => this.handleChange(event)}
              type="text"
            />
            <br />
            Twitter:
            <br />
            <input
              placeholder="Add Twitter"
              name="twitter"
              onChange={event => this.handleChange(event)}
              type="text"
              value={this.state.twitter}
            />
            <br />
            Instagram:
            <br />
            <input
              placeholder="Add Instagram"
              name="instagram"
              onChange={event => this.handleChange(event)}
              type="text"
              value={this.state.instagram}
            />
            <br />
            <div className="buttons-container">
              <div className="cancel-button">
                <button onClick={this.props.hideModal}>Cancel</button>
              </div>

              <div className="create-edit">
                <button
                  onClick={() => {
                    this.props.hideModal();
                    this.editProfile();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default ProfileModal;
