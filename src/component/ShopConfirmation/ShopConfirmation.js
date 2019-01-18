import React, { Component } from "react";
import "./ShopConfirmation.css";
import { Link } from "react-router-dom";

function ShopConfirmation(props) {
  return (
    <div className="confirmation-page-container">
      Thanks for your Order!! Order Confirmation
      <Link to="/shop">Back to Shop</Link>
      <Link to="/dashboard"> Go to your dashboard </Link>
    </div>
  );
}

export default ShopConfirmation;
