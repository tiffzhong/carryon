import React, { Component } from "react";
import { connect } from "react-redux";
import { getCart, addToCart, removeFromCart } from "../../ducks/shopReducer";
import "./ShoppingCart.css";
import { Link } from "react-router-dom";
class ShoppingCart extends Component {
  componentDidMount() {
    this.props.getCart();
  }

  render() {
    let { cart } = this.props;
    console.log(cart, "cart from props");

    let cartItem =
      cart.length > 0 &&
      cart.map(item => {
        console.log(item, "items in cart");
        return (
          <div className="items-container">
            <img src={item.image[0]} alt="product" />
            <h1>{item.product_name}</h1>
            <h5>{item.product_price}</h5>
          </div>
        );
      });

    return (
      <div>
        {cart.length ? (
          <div className="shopping-cart-container">{cartItem}</div>
        ) : (
          <div>
            your cart is empty! Shop at our store <Link to="/shop">here!!</Link>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { products, cart } = state.shop;
  return { products, cart };
};
const mapDispatchToProps = {
  getCart,
  addToCart,
  removeFromCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart);
