import React, { Component } from "react";
import "./BlogPostDisplay.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllBlogposts, deleteBlogPost } from "../../ducks/blogpostReducer";
import moment from "moment";

class BlogPostDisplay extends Component {
  render() {
    let { date, title, image_url, name, id, user } = this.props;
    console.log(this.props.auth, "show me auth");
    let { deleteBlogPost, auth } = this.props;

    const firstImage = image_url.map(imageOne => {
      return <img src={imageOne} alt="imageone" />;
    });
    return (
      <>
        <div className="display-container">
          <div className="display-date">
            <p>
              {date ? moment(date).format("MMMM Do YYYY h:mm:ss a") : "loading"}
            </p>
          </div>
          <div className="display-title">
            <Link to={`/post/${id}`}>
              <h2>{title ? title : "loading"}</h2>
            </Link>
          </div>
          <div className="display-user">by: {name ? name : "loading"}</div>
          <div className="display-image">
            {firstImage[0] ? firstImage[0] : "loading"}
          </div>
          {user.auth0_id === auth ? (
            <div>
              <button
                className="delete-button"
                onClick={() => deleteBlogPost(id)}
              >
                delete
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
  let { user, allBlogposts } = state;
  return {
    user,
    allBlogposts
  };
};

export default connect(
  mapStateToProps,
  { getAllBlogposts, deleteBlogPost }
)(BlogPostDisplay);
