import React, { Component } from "react";
import "./BlogPost.css";
import { Link } from "react-router-dom";
import { deleteBlogPost } from "../../ducks/blogpostReducer";
import { connect } from "react-redux";
class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogpost: {},
      images: []
    };
  }
  componentDidMount() {
  //   let blogpost = {};
  //   if (navigator.onLine) {
  //     blogpost = this.props.blogpostsList.find(
  //       post => post.id === this.props.match.params.id
  //     );
  //   } else {
  //     blogpost = JSON.parse(localStorage.getItem("blogposts")).find(
  //       post => post.id === this.props.props.match.params.id
  //     );
  //   }
  //   this.setState({
  //     blogpost,
  //     images: blogpost.image_url
  //   });
  // }
  render() {
    let { blogpost, images } = this.state;
    let { date, title, blurb, itinerary, user, id } = blogpost;
    let { deleteBlogPost } = this.props;
    console.log("blogpost", blogpost);
    return (
      <div className="blogpost-container">
        <div className="title-container">
          <p>{date}</p>
          <h2>{title}</h2>
          <h6>by: {user}</h6>
        </div>
        <div className="blurb-container">
          <p>{blurb}</p>
        </div>
        <div className="images-container">
          <img src={images[0]} alt={title} />
          <img src={images[1]} alt={title} />
        </div>
        <div className="itinerary-container">
          <h5>Itinerary: {itinerary}</h5>
        </div>
        <button className="delete-button" onClick={() => deleteBlogPost(id)}>
          delete
        </button>
        <Link to="/new">
          {/* <button className="edit-button" onClick={() => editBlogPost(id)}>
            Edit
          </button> */}
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { user, blogpostsList, loading, admin } = state;
  return { user, blogpostsList, loading, admin };
};
const mapDispatchToProps = {
  deleteBlogPost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogPost);
