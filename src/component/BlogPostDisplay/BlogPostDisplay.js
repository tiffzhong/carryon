import React, { Component } from "react";
import "./BlogPostDisplay.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllBlogposts, deleteBlogPost } from "../../ducks/blogpostReducer";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
class BlogPostDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDelete: false
    };
    this.clicked = this.clicked.bind(this);
  }
  clicked(id) {
    console.log("something");
    confirmAlert({
      title: " ",
      message: "Are you sure you want to delete your post?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.deleteBlogPost(id)
        },
        {
          label: "No",
          onClick: () => console.log("Clicked No")
        }
      ]
    });
  }
  render() {
    let { date, title, image_url, name, id, user, user_id } = this.props;

    let { auth } = this.props;

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
            <div className="display-user">{name ? name : "loading"}</div> •{" "}
            <div className="display-date">
              {date ? moment(date).format("MMMM Do YYYY") : "loading"}
            </div>
          </div>

          {user.auth0_id === auth ? (
            <div className="buttons-container1">
              <a className="delete-button" onClick={() => this.clicked(id)}>
                <i class="far fa-trash-alt" />
              </a>

              <Link to={`/blogpost/${id}`}>
                <p className="edit-button">
                  <i class="far fa-edit" />
                </p>
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
