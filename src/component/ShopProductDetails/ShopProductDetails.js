import React, { Component } from "react";
import "./ShopProductDetails.css";
import axios from "axios";
import { addToCart } from "../../ducks/shopReducer";
import ShopProductDetailSlick from "./ShopProductDetailSlick";
import PropTypes from "prop-types";

class ShopProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      image: []
    };
  }
  componentDidMount() {
    axios
      .get(`/api/product/${this.props.match.params.product_id}`)
      .then(res => {
        console.log("res.data", res.data);
        this.setState({
          product: res.data,
          image: res.data.product_picture
        });
      });
  }

  render() {
    console.log(this.state.image, "product deets");

    let {
      product_name,
      product_description,
      product_price
    } = this.state.product;
    const { products, history } = this.props;

    return (
      <div className="product-detail-container">
        <div className="picture-product">
          <ShopProductDetailSlick imageState={this.state.image} />
        </div>
        <div className="name-product">{product_name}</div>
        <div className="description-product">{product_description}</div>
        <div className="price-product">{product_price}</div>
        <span>Quantity</span>

        <button onClick={() => this.props.addToCart(product)}>
          Add to Cart
        </button>
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
  addToCart,
  getOneProduct
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
