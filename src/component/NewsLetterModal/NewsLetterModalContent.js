import React, { Component } from "react";
import "./NewsLetterModal.css";
import axios from "axios";
import Twilio from "../Twilio/Twilio";
class NewsLetterModalContent extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      phone: null
    };
  }

  newsletter = () => {
    const { email } = this.state;
    axios
      .post("/api/email/newsletter", { email })
      .then(res => {})
      .catch(error => error, "error in newsletter method");
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    let displayName = this.props.display
      ? "modal display-block"
      : "modal diaplay-none";

    return (
      <div className={displayName}>
        <div className="news-letter-modal">
          <h4>Sign up to receive our newsletter!</h4>

          <div className="content-inside-modal">
            <input
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={event => this.handleChange(event)}
            />
            *you will receive an email confirmation!
            <button
              className="inside-button"
              onClick={() => {
                this.newsletter(this.state.email);
                this.props.onHide();
              }}
            >
              Submit Email
            </button>
            <Twilio />
          </div>

          <div className="x-button-modal">
            <button
              onClick={() => {
                this.props.onHide();
              }}
            >
              X
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default NewsLetterModalContent;
