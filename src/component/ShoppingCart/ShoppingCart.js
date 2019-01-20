import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCart,
  addToCart,
  updateCart,
  removeFromCart
} from "../../ducks/shopReducer";
import "./ShoppingCart.css";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import logo from "../Header/logo.png";

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: false,
      order: []
    };
  }
  redirect() {
    window.location.pathname = "/confirmation";
  }
  amountTotal = amount => amount * 100;
  onToken = token => {
    axios
      .post("/save-stripe-token", {
        token,
        amount: this.amountTotal(this.props.total)
      })
      .then(response => {
        alert("Payment Successful!");
        this.props.getCart();
        this.setState({
          completed: true,
          order: response.data
        });
      })
      .then(this.redirect())
      .catch(err => err);
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  componentDidMount() {
    this.props.getCart();
  }

  render() {
    let { order } = this.state;
    let { cart, total } = this.props;
    console.log(cart, "cart from props");
    console.log(total, "total from props");
    console.log(order, "teh ordereh");

    let cartItem =
      cart.length > 0 &&
      cart.map(item => {
        console.log(item, "items in cart");
        return (
          <div className="items-container">
            <div className="delete-img-name-container">
              <button
                onClick={() => this.props.removeFromCart(item.product_id)}
              >
                X
              </button>
              <div className="cart-product-image">
                <Link to={`/product/${item.product_id}`}>
                  <img src={item.image[0]} alt="product" />
                </Link>
              </div>
              <div className="cart-product-name">
                <Link to={`/product/${item.product_id}`}>
                  <h1>{item.product_name}</h1>
                </Link>
              </div>
            </div>
            <div className="cart-product-qty">
              <input
                name={item.product_name}
                type="number"
                value={this.state[item.product_name] || item.quantity}
                onChange={event => {
                  this.handleChange(event);
                }}
              />

              <button
                onClick={() =>
                  this.props.updateCart(
                    item.product_id,
                    this.state[item.product_name]
                  )
                }
              >
                Update
              </button>
            </div>
            <div className="cart-product-price">
              <h5>{item.product_price}</h5>
            </div>
          </div>
        );
      });

    return (
      <div className="entire-shopping-cart">
        <div className="shopping-cart-banner">
          <h2>Cart</h2>
        </div>
        {cart.length ? (
          <div className="the-shop-container">
            <Link to="/shop">Shop</Link> > Cart
            <div className="table-header">
              <div className="table-item">
                <p>Item</p>
              </div>
              <div className="table-qty">
                <p>Quantity</p>
              </div>
              <div className="table-price">
                <p>Price</p>
              </div>
            </div>
            <div className="shopping-cart-container">
              {cartItem}
              <div className="subtotal-cart-container">
                Subtotal: ${total}.00
                <StripeCheckout
                  ComponentClass="stripe"
                  amount={this.amountTotal(total)}
                  token={this.onToken}
                  stripeKey="pk_live_5i0UytIc5J329Hrm1lJ4bFoS"
                  name="Carry On" // the pop-in header title
                  description="Thank you for your order!" // the pop-in header subtitle
                  image={logo} // the pop-in header image (default none)
                  currency="USD"
                  shippingAddress
                  billingAddress={true}
                >
                  <button className="checkout-button">Checkout</button>
                </StripeCheckout>
                {/* <Link to="/checkout">
                  <button className="checkout-button">Checkout</button>
                </Link> */}
                {/* <Link to="/shop">
                  <button className="left-arrow-checkout">
                    <i class="fas fa-long-arrow-alt-left" />
                  </button>
                </Link> */}
              </div>
            </div>
          </div>
        ) : (
          <>
            <Link to="/shop">Shop</Link> > Cart
            <div className="empty-cart-message">
              <h3>
                You have nothing in your shopping cart.
                <br />
                <Link to="/shop">Continue Shopping</Link>
              </h3>
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { products, cart, total } = state.shop;
  return { products, cart, total };
};
const mapDispatchToProps = {
  getCart,
  addToCart,
  updateCart,
  removeFromCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart);
