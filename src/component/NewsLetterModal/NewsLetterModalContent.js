import React, { Component } from "react";
import "./NewsLetterModal.css";
import axios from "axios";
class NewsLetterModalContent extends Component {
  constructor() {
    super();

    this.state = {
      email: ""
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
          <h4>Sign up to get our newsletter!</h4>
          <input
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={event => this.handleChange(event)}
          />
          <button
            onClick={() => {
              this.newsletter(this.state.email);
              this.props.onHide();
            }}
          >
            Submit!
          </button>
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
