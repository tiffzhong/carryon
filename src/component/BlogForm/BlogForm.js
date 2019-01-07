import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./BlogForm.css";
import {
  setUser,
  createBlogPost,
  editBlogPost,
  getOne
} from "../../ducks/blogpostReducer";
import moment from "moment";
import request from "superagent";
import Dropzone from "react-dropzone";
import axios from "axios";

// const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/tiffz";
// const CLOUDINARY_UPLOAD_PRESET = "carryon";

class BlogForm extends Component {
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

  componentDidMount() {
    if (this.props.match.params.postid) {
      axios
        .get("/api/blogpost/:id")
        .then(res => {
          return this.props.getOne(res.data);
        })
        .catch(error => console.log("error in getting 1", error));

      this.setState({
        user: this.props.user,
        date: this.props.date,
        title: this.props.title,
        image_url: this.props.image_url,
        blurb: this.props.blurb,
        itinerary: this.props.itinerary
      });
    }
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
    const { createBlogPost, editBlogPost } = this.props;
    let { id } = this.props.match.params;

    // const { user } = this.props;
    return (
      <div>
        {this.props.match.params.postid ? (
          <div className="blogform-container">
            <div className="blogform-banner">
              <h1>Edit</h1>
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
                    editBlogPost(
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
                  Edit BlogPost
                </button>
              </Link>
            </form>
          </div>
        ) : (
          <div className="blogform-container">
            <div className="blogform-banner">
              <h1>Create</h1>
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
                  Post
                </button>
              </Link>
            </form>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { blogpostsList, blogpost } = state;
  return {
    blogpostsList,
    blogpost
  };
};
export default connect(
  mapStateToProps,
  { setUser, createBlogPost, editBlogPost, getOne }
)(BlogForm);

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
