import React, { Component } from "react";
import { connect } from "react-redux";
import "./BlogForm.css";
import {
  setUser,
  createBlogPost,
  editBlogPost
} from "../../ducks/blogpostReducer";
import moment from "moment";
import request from "superagent";
import Dropzone from "react-dropzone";

const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/tiffz";
const CLOUDINARY_UPLOAD_PRESET = "carryon";

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
    let blogpost = {};
    this.props.match.params.id &&
      (blogpost = this.props.allBlogPosts.find(
        blog => blog.id === this.props.match.params.id
      ));
    this.setState({
      user: blogpost.user,
      date: blogpost.date,
      title: blogpost.title,
      image_url: blogpost.image_url,
      blurb: blogpost.blurb,
      itinerary: blogpost.itinerary
    });
  }
  dropImage(files) {
    this.setState({
      uploadedPhotos: files
    });
    this.handleImageUpload(files);
  }

  handleImageUpload(files) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("uploadedFiles", files);

    upload.end((err, res) => {
      if (err) {
        console.log(err);
      }
      if (res.body.secure_url !== "" || res.body.secure_url !== undefined) {
        let image_url = res.body.secure_url,
          uploadedUrlOnCloudinary = res.body.secure_url;

        this.setState({
          ...this.state,
          image_url,
          uploadedUrlOnCloudinary
        });
      }
    });
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
    const {
      user,
      date,
      title,
      image_url,
      blurb,
      itinerary,
      uploadedPhotos
    } = this.state;
    const { admin, createBlogPost, editBlogPost } = this.props;
    let { id } = this.props.match.params;

    let cloudinaryPhotos = uploadedPhotos.map(file => {
      return (
        <div>
          {this.state.uploadedUrlOnCloudinary === "" ? null : (
            <div>
              <p>{file.name}</p>
            </div>
          )}
        </div>
      );
    });
    return (
      <div className="blogform">
        {admin.name ? (
          this.props.match.params.id ? (
            <div>
              <h3>Edit Blogpost</h3>
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
                <Dropzone
                  multiple={true}
                  accept="image/*"
                  onDrop={this.dropImage.bind(this)}
                >
                  {!this.state.uploadedUrlOnCloudinary && (
                    <p>Drop Images Here </p>
                  )}
                  <div>
                    {this.state.uploadedUrlOnCloudinary === "" ? null : (
                      <div>
                        <p>{this.state.uploadedPhotos.name}</p>
                      </div>
                    )}
                  </div>
                </Dropzone>
                {cloudinaryPhotos}

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
              </form>
            </div>
          ) : (
            <div>
              <h3>Create New Blog Post</h3>
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
                <Dropzone
                  multiple={true}
                  accept="image/*"
                  onDrop={this.dropImage.bind(this)}
                >
                  {!this.state.uploadedUrlOnCloudinary && (
                    <p>Drop Images Here </p>
                  )}
                  <div>
                    {this.state.uploadedUrlOnCloudinary === "" ? null : (
                      <div>
                        <p>{this.state.uploadedPhotos.name}</p>
                      </div>
                    )}
                  </div>
                </Dropzone>
                {cloudinaryPhotos}

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
                  Create BlogPost
                </button>
              </form>
            </div>
          )
        ) : (
          <p>Please login to see this page</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { blogpostsList, admin } = state;
  return {
    blogpostsList,
    admin
  };
};
export default connect(
  mapStateToProps,
  { setUser, createBlogPost, editBlogPost }
)(BlogForm);
