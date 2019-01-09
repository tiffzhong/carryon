import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./BlogFormCreate.css";
import { setUser, createBlogPost } from "../../ducks/blogpostReducer";
import moment from "moment";
import request from "superagent";
import Dropzone from "react-dropzone";
import Cloudinary from "../Cloudinary/Cloudinary";

const CLOUDINARY_UPLOAD_PRESET = "carryon";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/tiffz/image/upload";

class BlogFormCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment().format("MMMM Do YYYY h:mm a"),
      title: "",
      image_url: [],
      blurb: "",
      itinerary: "",
      files: [],
      image_url: [],
      cloudinaryUrl: ""
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

  onDrop = files => {
    this.setState({
      files: files.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    });
    this.handleImageUpload(files);
  };

  handleImageUpload(files) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", files);

    upload.end((err, response) => {
      console.log("SHOW RESPONSE FOR UPLOAD", response);
      if (err) {
        console.log("error w upload", err);
      }
      if (response.body) {
        let image_url = response.body.secure_url,
          cloudinaryUrl = response.body.secure_url;

        this.setState({
          ...this.state,
          image_url,
          cloudinaryUrl
        });
      }
    });
  }

  componentWillUnmount() {
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
  }

  clear = () => {
    this.setState({ files: [], cloudinaryUrl: "" });
  };

  render() {
    console.log("this.props.user", this.props.user);
    console.log("match", this.props.match.params);
    console.log("state", this.state, this.state.date, "is date working");
    const { date, title, image_url, blurb, itinerary } = this.state;
    const { createBlogPost, user } = this.props;
    let { id } = this.props.match.params;
    console.log("files", this.state.files);
    const { files } = this.state;
    const thumbs = files.map(file => (
      <div className="thumb">
        <img src={file.preview} alt="preview" />
      </div>
    ));

    return (
      <div className="blogform-container">
        <div className="blogform-banner">
          <h2>Create</h2>
        </div>
        <form className="form" onSubmit={event => this.onSubmit(event)}>
          {moment().format("MMMM Do YYYY")}
          <br />

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
            <textarea
              placeholder="How was your trip?"
              name="blurb"
              type="text"
              value={blurb}
              onChange={event => this.handleChange(event)}
            />
          </div>

          <div className="itinerary-field">
            <textarea
              placeholder="itinerary"
              name="itinerary"
              type="text"
              value={itinerary}
              onChange={event => this.handleChange(event)}
            />
          </div>

          <label>Photos:</label>
          <div>
            <Dropzone
              className="drooopzone"
              accept="image/*"
              onDrop={this.onDrop.bind(this)}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drop files here</p>
                </div>
              )}
            </Dropzone>
            {thumbs}
          </div>
          <br />
          <Link to="/dashboard">
            <button
              onClick={() =>
                createBlogPost(
                  date,
                  title,
                  image_url,
                  blurb,
                  itinerary,
                  user.name,
                  user.auth0_id
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
  let { blogpost, user } = state;
  return {
    blogpost,
    user
  };
};

export default connect(
  mapStateToProps,
  { setUser, createBlogPost }
)(BlogFormCreate);
