import React, { Component } from "react";

class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
      cart: []
    };
  }

  componentDidMount() {
    this.setState({
      cart: 
    });
  }
  addToCart = () => {
    console.log("adding to cart");
  };
  render() {
    return <div />;
  }
}

export default ShoppingCart;
