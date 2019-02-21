import React, { Component } from "react";
import "./ShopFront.css";

import { connect } from "react-redux";
import { getAllProducts } from "../../ducks/shopReducer";
import ShopProductDisplay from "../ShopProductDisplay/ShopProductDisplay";

import axios from "axios";
class ShopFront extends Component {
  constructor() {
    super();

    this.state = {
      email: ""
    };
  }
  componentDidMount() {
    this.props.getAllProducts();
  }
  newsletter = () => {
    const { email } = this.state;
    axios
      .post("/api/email/newsletter", { email })
      .then(res => {})
      .catch(error => error, "error in newsletter method");
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    // console.log(this.props, "this.props in shop front");
    let { products } = this.props;
    let displayAllProducts = products.map(productItem => {
      return <ShopProductDisplay {...productItem} />;
    });
    return (
      <>
        <div className="the-entire-shop">
          <div className="shop-banner">
            <h2>Shop</h2>
          </div>

          <div className="display-all-products">{displayAllProducts}</div>
          <h4>Want to receive our newsletter?</h4>
          <div className="newsletter-on-store-front">
            <input
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={event => this.handleChange(event)}
            />
            <button
              className="submit-button-store-front"
              onClick={() => {
                this.newsletter(this.state.email);
              }}
            >
              Submit!
            </button>
          </div>
        </div>
      </>
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
