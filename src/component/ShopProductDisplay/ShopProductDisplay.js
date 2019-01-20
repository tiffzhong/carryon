import React, { Component } from "react";
import "./ShopProductDisplay.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllProducts } from "../../ducks/shopReducer";
import HoverImage from "react-hover-image";

class ShopProductDisplay extends Component {
  render() {
    let {
      product_id,
      product_name,
      product_price,
      product_picture
    } = this.props;

    const firstProductImage = product_picture.map(productImageOne => {
      return productImageOne;
    });
    // console.log(firstProductImage, "firstProductImage");
    return (
      <div className="product-display-container">
        <div className="product-display-image">
          <Link
            style={{ textDecoration: "none" }}
            to={`/product/${product_id}`}
          >
            <HoverImage
              src={firstProductImage[0]}
              hoverSrc={firstProductImage[1]}
            />
          </Link>
        </div>
        <div className="product-display-name">
          {product_name ? product_name : null}
        </div>
        <div className="product-display-price">
          ${product_price ? product_price : null}
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
)(ShopProductDisplay);
