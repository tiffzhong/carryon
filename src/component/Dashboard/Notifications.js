import React from "react";
import moment from "moment";

const Notifications = props => {
  return (
    <div className="section">
      <span className="card title">Notifications</span>
      <ul className="notifications">
        <li>Someone Posted</li>
        <li>Someone Joined!</li>
      </ul>
    </div>
  );
};

export default Notifications;
