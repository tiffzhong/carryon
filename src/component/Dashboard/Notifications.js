import React from "react";

const Notifications = props => {
  return (
    <div className="section">
      <span className="card title">Notifications</span>
      <ul className="notifications">
        <li>Something Happened</li>
        <li>Someone Posted</li>
        <li>Someone Joined!</li>
      </ul>
    </div>
  );
};

export default Notifications;
