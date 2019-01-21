import React, { Component } from "react";
import "./Twilio.css";
import axios from "axios";

class Twilio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: ""
    };
  }
  sendText = () => {
    if (this.state.phone) {
      let body = {
        to: parseInt(this.state.phone),
        body:
          "From Carry On: Thx for Joining! We will msg you when Newsletters are available :) www.carryontravel.us"
      };
      axios.post("/api/messages", body).then(res => {
        console.log("successfully sent msg");
      });
    }
  };
  onHandleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    return (
      <div className="twilio">
        <input
          name="phone"
          onChange={this.onHandleChange}
          placeholder="Phone Number"
        />
        *no spaces, dashes, or parentheses please!*
        <button
          onClick={() => {
            this.sendText();
          }}
          type="submit"
        >
          Submit Phone Number
        </button>
      </div>
    );
  }
}
export default Twilio;
