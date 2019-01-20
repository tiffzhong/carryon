import React, { Component } from "react";
import "./BlogPostDisplay.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllBlogposts, deleteBlogPost } from "../../ducks/blogpostReducer";
import moment from "moment";

class BlogPostDisplay extends Component {
  render() {
    let { date, title, image_url, name, id, user, user_id } = this.props;

    let { deleteBlogPost, auth } = this.props;

    const firstImage = image_url.map(imageOne => {
      return <img src={imageOne} alt="imageone" />;
    });
    return (
      <>
        <div className="display-container">
          <div className="display-image">
            <Link to={`/post/${id}`}>
              {firstImage[0] ? firstImage[0] : "loading"}
            </Link>
          </div>
          <div className="display-title">
            <Link to={`/post/${id}`}>{title ? title : "loading"}</Link>
          </div>

          <div className="bottom-line-tag">
            <div className="display-user">
              <Link to={`/profile/${id}`}>{name ? name : "loading"}</Link>
            </div>
            •
            <div className="display-date">
              {date ? moment(date).format("MMMM Do YYYY") : "loading"}
            </div>
          </div>

          {user.auth0_id === auth ? (
            <div className="buttons-container1">
              <button
                className="delete-button"
                onClick={() => deleteBlogPost(id)}
              >
                Delete
              </button>
              <Link to={`/blogpost/${id}`}>
                <button className="edit-button">Edit</button>
              </Link>
            </div>
          ) : null}
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  let { user, allBlogposts } = state.blogpost;
  return {
    user,
    allBlogposts
  };
};

export default connect(
  mapStateToProps,
  { getAllBlogposts, deleteBlogPost }
)(BlogPostDisplay);
