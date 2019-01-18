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
class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  componentDidMount() {
    this.props.getCart();
  }

  render() {
    let { cart, total } = this.props;
    console.log(cart, "cart from props");
    console.log(total, "total from props");
    console.log(this.state, "ese stateh");
    let cartItem =
      cart.length > 0 &&
      cart.map(item => {
        console.log(item, "items in cart");
        return (
          <div className="items-container">
            <img src={item.image[0]} alt="product" />
            <h1>{item.product_name}</h1>
            <h5>{item.product_price}</h5>
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
            <button onClick={() => this.props.removeFromCart(item.product_id)}>
              Delete
            </button>
          </div>
        );
      });

    return (
      <div>
        {cart.length ? (
          <div className="shopping-cart-container">
            {cartItem}
            Cart Total: ${total}.00
            <Link to="/shop">
              <button>Add More</button>
            </Link>
            <Link to="/checkout">
              <button>Checkout</button>
            </Link>
          </div>
        ) : (
          <div className="empty-cart-message">
            Your cart is empty! Shop at our store <Link to="/shop">here!!</Link>
          </div>
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
