import React, { Component } from "react";
import "./ShopProductDetails.css";
import axios from "axios";
import { addToCart } from "../../ducks/shopReducer";
import ShopProductDetailSlick from "./ShopProductDetailSlick";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ShopProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      image: [],
      quantity: 1
    };
  }
  componentDidMount() {
    axios
      .get(`/api/product/${this.props.match.params.product_id}`)
      .then(res => {
        // console.log("res.data", res.data);
        this.setState({
          product: res.data,
          image: res.data.product_picture
        });
      });
  }

  render() {
    // console.log(this.state.image, "product deets");

    let {
      product_id,
      product_name,
      product_description,
      product_price
    } = this.state.product;
    let { image, quantity } = this.state;
    const { history, total } = this.props;

    return (
      <>
        <div className="product-detail-container">
          <div class="links-shop">
            <Link to="/shop">Shop</Link> > {product_name}
          </div>
          <div className="picture-product">
            <ShopProductDetailSlick imageState={this.state.image} />
          </div>
          <div className="name-product">{product_name}</div>
          <div className="price-product">${product_price}</div>
          <div className="description-product">{product_description}</div>
          <div className="product-and-quantity">
            <p>Quantity</p>

            <div className="quantity-product">
              <button
                onClick={() =>
                  this.state.quantity > 1 &&
                  this.setState({
                    quantity: this.state.quantity - 1
                  })
                }
              >
                <i class="fas fa-angle-left" />
              </button>
              <p>{this.state.quantity}</p>
              <button
                onClick={() =>
                  this.setState({
                    quantity: this.state.quantity + 1
                  })
                }
              >
                <i class="fas fa-angle-right" />
              </button>
            </div>
          </div>
          <div class="adding">
            <button
              className="add-to-cart-button"
              onClick={() =>
                this.props.addToCart(
                  product_id,
                  product_name,
                  product_price,
                  quantity,
                  image,
                  total
                )
              }
            >
              Add to Cart
            </button>
          </div>
          <div className="bottom-buttons">
            <Link to="/shoppingcart">
              <button>
                <i class="fas fa-shopping-cart" />
              </button>
            </Link>
            <button onClick={() => history.goBack()}>
              <i class="fas fa-long-arrow-alt-left" />
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  let { product } = state.shop;
  return { product };
};
const mapDispatchToProps = {
  addToCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopProductDetails);

ShopProductDetails.propTypes = {
  product: PropTypes.shape({
    product_id: PropTypes.number,
    product_name: PropTypes.string,
    product_description: PropTypes.string,
    product_price: PropTypes.string,
    product_picture: PropTypes.arrayOf(PropTypes.string),
    product_quantity: PropTypes.number
  }).isRequired
};
