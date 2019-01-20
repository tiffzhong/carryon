import React, { Component } from "react";
import "./ShopConfirmation.css";
import { Link } from "react-router-dom";

function ShopConfirmation(props) {
  return (
    <div className="confirmation-page-container">
      <div className="thank-you">
        Thank you so much for your Order! Please expect your items to arrive
        within 6 months or never. <br />
        <br />
      </div>
      <div className="buutoons">
        <div className="buutoons1">
          <Link to="/shop">Shop</Link>
        </div>
        <div className="buutoons2">
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>
    </div>
  );
}

export default ShopConfirmation;
