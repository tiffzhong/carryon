import React, { Component } from "react";
import "./ShopFront.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllProducts } from "../../ducks/shopReducer";
import ShopProductDisplay from "../ShopProductDisplay/ShopProductDisplay";

class ShopFront extends Component {
  componentDidMount() {
    this.props.getAllProducts();
  }

  render() {
    console.log(this.props, "this.props in shop front");
    let { products } = this.props;
    let displayAllProducts = products.map(productItem => {
      return <ShopProductDisplay {...productItem} />;
    });
    return (
      <div className="the-entire-shop">
        <div className="shop-banner">
          <h2>Shop</h2>
        </div>

        <div className="display-all-products">{displayAllProducts}</div>

        <div className="newsletter-store-front">
          <input />Sign up for our Newsletter
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { products } = state.shop;
  return {
    products
  };
};

export default connect(
  mapStateToProps,
  { getAllProducts }
)(ShopFront);
