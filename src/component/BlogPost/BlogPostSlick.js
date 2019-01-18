import React, { Component } from "react";
import Slider from "react-slick";

export default class BlogPostSlick extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    console.log(this.props.images, "allimages");
    let image = this.props.images.map((slickImage, i) => {
      return (
        <div className="slick-image-container-again">
          <img src={slickImage} alt="slick preview" key={i} />
        </div>
      );
    });
    return (
      <div className="slick-images-container">
        <Slider {...settings}>{image}</Slider>
      </div>
    );
  }
}
