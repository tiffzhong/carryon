import React, { Component } from "react";
import "./BlogPost.css";
import { Link } from "react-router-dom";
import { deleteBlogPost } from "../../ducks/blogpostReducer";
import { connect } from "react-redux";
import moment from "moment";

class BlogPost extends Component {
  render() {
    console.log(this.props);
    let {
      date,
      title,
      image_url,
      blurb,
      itinerary,
      name,
      id,
      user
    } = this.props;
    let { deleteBlogPost, auth } = this.props;
    console.log("JUST ID", auth, name, user);

    const allImages = image_url.map(imageId => {
      console.log(imageId, "ASLDKFJ;ASLKDJ;LSKDF;SDF");
      return <img src={imageId} alt="imageid" />;
    });

    return (
      <div className="blogpost-container">
        <div className="title-container">
          <p>
            {date ? moment(date).format("MMMM Do YYYY h:mm:ss a") : "loading"}
          </p>

          <h2>{title ? title : "loading"}</h2>
          <h6>by: {name ? name : "loading"}</h6>
        </div>
        <div className="blurb-container">
          <p>{blurb ? blurb : "loading"}</p>
        </div>
        <div className="images-container">{allImages}</div>
        <div className="itinerary-container">
          <h5>Itinerary: {itinerary ? itinerary : "loading"}</h5>
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
    );
  }
}

const mapStateToProps = state => {
  let { user, blogpostsList } = state;
  return { user, blogpostsList };
};
const mapDispatchToProps = {
  deleteBlogPost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogPost);
