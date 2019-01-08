import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./BlogFormCreate.css";
import { setUser, createBlogPost } from "../../ducks/blogpostReducer";
import moment from "moment";
import request from "superagent";
import Dropzone from "react-dropzone";

// const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/tiffz";
// const CLOUDINARY_UPLOAD_PRESET = "carryon";

class BlogFormCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      date: null,
      title: "",
      image_url: [],
      blurb: "",
      itinerary: "",
      uploadedUrlOnCloudinary: "",
      uploadedPhotos: []
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
  }

  render() {
    console.log("this.props.user.name", this.props);
    console.log("match", this.props.match.params);
    console.log("props", this.props);
    const {
      user,
      date,
      title,
      image_url,
      blurb,
      itinerary,
      uploadedPhotos
    } = this.state;
    const { createBlogPost } = this.props;
    let { id } = this.props.match.params;

    // const { user } = this.props;
    return (
      <div className="blogform-container">
        <div className="blogform-banner">
          <h2>Create</h2>
        </div>
        <form onSubmit={event => this.onSubmit(event)}>
          <label>Title</label>
          <div className="title-field">
            <input
              placeholder="title"
              name="title"
              type="text"
              value={title}
              onChange={event => this.handleChange(event)}
            />
          </div>

          <div className="blurb-field">
            <label>Blurb</label>
            <input
              placeholder="blurb"
              name="blurb"
              type="text"
              value={blurb}
              onChange={event => this.handleChange(event)}
            />
          </div>

          <div className="itinerary-field">
            <label>Itinerary</label>
            <input
              placeholder="itinerary"
              name="itinerary"
              type="text"
              value={itinerary}
              onChange={event => this.handleChange(event)}
            />
          </div>

          <label>Photos:</label>

          <Link to="/dashboard">
            <button
              onClick={() =>
                createBlogPost(
                  date,
                  title,
                  image_url,
                  blurb,
                  itinerary,
                  user,
                  id
                )
              }
            >
              Post Blogpost
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { blogpost } = state;
  return {
    blogpost
  };
};
export default connect(
  mapStateToProps,
  { setUser, createBlogPost }
)(BlogFormCreate);

{
  /* //------------------START CLOUDINARY METHODS------------------ 
  // dropImage(files) {
  //   this.setState({
  //     uploadedPhotos: files
  //   });
  //   this.handleImageUpload(files);
  // }

  // handleImageUpload(files) {
  //   let upload = request
  //     .post(CLOUDINARY_UPLOAD_URL)
  //     .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
  //     .field("uploadedFiles", files);

  //   upload.end((err, res) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     if (res.body.secure_url !== "" || res.body.secure_url !== undefined) {
  //       let image_url = res.body.secure_url,
  //         uploadedUrlOnCloudinary = res.body.secure_url;

  //       this.setState({
  //         ...this.state,
  //         image_url,
  //         uploadedUrlOnCloudinary
  //       });
  //     }
  //   });
  // }
  //------------------EDN CLOUDINARY METHODS------------------ */
}

{
  //IGNORE--------------------
  /* <Dropzone
              multiple={true}
              accept="image/*"
              onDrop={this.dropImage.bind(this)}
            >
              {!this.state.uploadedUrlOnCloudinary && <p>Drop Images Here </p>}
              <div>
                {this.state.uploadedUrlOnCloudinary === "" ? null : (
                  <div>
                    <p>{this.state.uploadedPhotos.name}</p>
                  </div>
                )}
              </div>
            </Dropzone>
            {cloudinaryPhotos} */
}
