import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ShopCheckout.css";

class ShopCheckout extends Component {
  render() {
    return (
      <div className="shopping-checkout-container">
        <h2>Your Cart</h2>

        <Link to="/shoppingcart">
          <button>Edit Cart</button>
        </Link>
        <h2>Pay w Stripe></h2>
      </div>
    );
  }
}
export default ShopCheckout;
