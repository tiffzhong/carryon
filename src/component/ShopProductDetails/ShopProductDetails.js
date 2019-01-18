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
      quantity: 1,
      total: 1
    };
  }
  componentDidMount() {
    axios
      .get(`/api/product/${this.props.match.params.product_id}`)
      .then(res => {
        console.log("res.data", res.data);
        this.setState({
          product: res.data,
          image: res.data.product_picture,
          total: res.data.product_price
        });
      });
  }

  render() {
    console.log(this.state.image, "product deets");

    let {
      product_id,
      product_name,
      product_description,
      product_price
    } = this.state.product;
    let { image, quantity } = this.state;
    const { product, history } = this.props;

    return (
      <div className="product-detail-container">
        <div className="picture-product">
          <ShopProductDetailSlick imageState={this.state.image} />
        </div>
        <div className="name-product">{product_name}</div>
        <div className="description-product">{product_description}</div>
        <div className="price-product">{product_price}</div>

        <div className="quantity-product">
          <p>Quantity</p>
          <button
            onClick={() =>
              this.state.quantity > 1 &&
              this.setState({
                quantity: this.state.quantity - 1,
                total: (this.state.quantity - 1) * product_price
              })
            }
          >
            <i class="fas fa-angle-left" />
          </button>
          <p>{this.state.quantity}</p>
          <button
            onClick={() =>
              this.setState({
                quantity: this.state.quantity + 1,
                total: (this.state.quantity + 1) * product_price
              })
            }
          >
            <i class="fas fa-angle-right" />
          </button>
        </div>

        <button
          onClick={() =>
            this.props.addToCart(
              product_id,
              product_name,
              product_price,
              quantity,
              image
            )
          }
        >
          Add to Cart
        </button>
        <Link to="/shoppingcart">
          <button>Check Out</button>
        </Link>
        <button onClick={() => history.goBack()}>Go Back</button>
      </div>
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
