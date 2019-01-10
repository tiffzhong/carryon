import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./BlogFormCreate.css";
import { setUser, createBlogPost } from "../../ducks/blogpostReducer";
import moment from "moment";
import request from "superagent";
import Dropzone from "react-dropzone";

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
      cloudinaryUrl: []
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
    console.log(files, "files uploading");
    const eachFileUrl = files.forEach(file => {
      let upload = request
        .post(CLOUDINARY_UPLOAD_URL)
        .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
        .field("file", file);

      upload.end((err, response) => {
        console.log("SHOW RESPONSE FOR UPLOAD", response);
        if (err) {
          console.log("error w upload", err);
        }
        if (response.body) {
          let image_url = this.state.image_url.concat(),
            cloudinaryUrl = this.state.cloudinaryUrl.concat();

          image_url.push(response.body.secure_url);
          cloudinaryUrl.push(response.body.secure_url);

          this.setState({
            ...this.state,
            image_url,
            cloudinaryUrl
          });
        }
      });
    });
  }

  componentWillUnmount() {
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
  }

  clear = () => {
    this.setState({ files: [], cloudinaryUrl: "" });
  };

  render() {
    console.log("state", this.state);
    const { date, title, image_url, blurb, itinerary } = this.state;
    const { createBlogPost, user } = this.props;

    const { files } = this.state;
    const thumbs = files.map(file => (
      <div className="thumb">
        <img src={file.preview} width={200} alt="preview" />
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
            <Dropzone onDrop={this.onDrop.bind(this)} accept="image/*" multiple>
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
