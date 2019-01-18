import React, { Component } from "react";
import Slider from "react-slick";
import "./ShopProductDetails.css";
export default class ShopProductDetailSlick extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    // console.log(this.props.imageState, "product images??");
    const { imageState } = this.props;
    let productimage = imageState.map((productSlickImage, i) => {
      // console.log(imageState);
      return (
        <div className="product-picture-in-slick">
          <img src={productSlickImage} alt="product slick preview" key={i} />
        </div>
      );
    });

    return (
      <div className="slick-images-container">
        <Slider {...settings}>{productimage}</Slider>
      </div>
    );
  }
}
