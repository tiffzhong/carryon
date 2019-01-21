import React, { Component } from "react";
import "./NewsLetterModal.css";
import NewsLetterModalContent from "./NewsLetterModalContent";

class NewsLetterModal extends Component {
  constructor() {
    super();

    this.state = {
      display: false
    };
  }
  showModal = () => {
    this.setState({ display: true });
  };
  hideModal = () => {
    this.setState({ display: false });
  };

  render() {
    return (
      <div className="button-pop-up">
        {this.state.display ? (
          <NewsLetterModalContent
            display={this.state.display}
            onHide={this.hideModal}
          />
        ) : null}
        <button className="outside-button" onClick={this.showModal}>
          Join Our Newsletter?
        </button>
      </div>
    );
  }
}
export default NewsLetterModal;
