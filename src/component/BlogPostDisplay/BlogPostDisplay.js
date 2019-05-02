import React, { Component } from "react";
import "./BlogPostDisplay.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllBlogposts, deleteBlogPost } from "../../ducks/blogpostReducer";
import moment from "moment";

class BlogPostDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDelete: false
    };
  }

  clicked = id => {
    this.props.deleteBlogPost(id);
  };
  render() {
    let { date, title, image_url, name, id, user } = this.props;

    let { auth } = this.props;

    const firstImage = image_url.map(imageOne => {
      return <img src={imageOne} alt="imageone" />;
    });
    return (
      <>
        <div className="display-container">
          <div className="thepost-container">
            <div className="display-image">
              {/* div "container" */}
              <Link to={`/post/${id}`}>
                {firstImage[0] ? firstImage[0] : "loading"}
              </Link>
            </div>

            {/* p "title"  */}
            <div className="display-title">
              <Link to={`/post/${id}`}>{title ? title : "loading"}</Link>
            </div>

            <div className="bottom-line-tag">
              <Link to={`/post/${id}`}>
                <div className="display-user">{name ? name : "loading"}</div>
                <div className="display-date">
                  {date ? moment(date).format("MMMM Do YYYY") : "loading"}
                </div>
              </Link>
            </div>

            <div className="overlay" />

            {user.auth0_id === auth ? (
              <div className="buttons-container1">
                <a
                  href=""
                  className="delete-button"
                  onClick={() => this.clicked(id)}
                >
                  <i class="far fa-trash-alt" />
                </a>
                <Link to={`/blogpost/${id}`}>
                  <a href="" className="edit-button">
                    <i class="far fa-edit" />
                  </a>
                </Link>
              </div>
            ) : null}
          </div>
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
