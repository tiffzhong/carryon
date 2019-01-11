import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./BlogFormCreate.css";
import { setUser, createBlogPost } from "../../ducks/blogpostReducer";
import moment from "moment";
import request from "superagent";
import Dropzone from "react-dropzone";
import axios from "axios";

const CLOUDINARY_UPLOAD_PRESET = "carryon";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/tiffz/image/upload";

class BlogFormCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment().format(),
      title: "",
      image_url: [],
      blurb: "",
      itinerary: "",
      files: [],
      cloudinaryUrl: [],
      publicId: []
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

  clear = id => {
    // image_url,
    // cloudinaryUrl,
    // publicId
    console.log(id, "IDLKSAJDLKFJASLF");
    let body = {
      publicId: this.state.publicId[id]
    };
    axios.post("/api/image/blogpost", body).then(response => {
      console.log("idASDFK;OSDFLK;SDJFLK;J", id);
      let newImageUrl = this.state.image_url;
      let newCloudinaryURL = this.state.cloudinaryUrl;
      let newPublicId = this.state.publicId;
      let newFile = this.state.files;

      newImageUrl.splice(id, 1);
      newCloudinaryURL.splice(id, 1);
      newPublicId.splice(id, 1);
      newFile.splice(id, 1);

      this.setState({
        image_url: newImageUrl,
        cloudinaryUrl: newCloudinaryURL,
        publicId: newPublicId,
        files: newFile
      });
      console.log(response, "res from THE CLOUDDDDD");
    });
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
            cloudinaryUrl = this.state.cloudinaryUrl.concat(),
            publicId = this.state.publicId.concat();

          image_url.push(response.body.secure_url);
          cloudinaryUrl.push(response.body.secure_url);
          publicId.push(response.body.public_id);

          this.setState({
            ...this.state,
            image_url,
            cloudinaryUrl,
            publicId
          });
        }
      });
    });
  }

  // componentWillUnmount() {
  //   this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
  // }

  render() {
    console.log("state", this.state);
    const { date, title, image_url, blurb, itinerary } = this.state;
    const { createBlogPost, user } = this.props;
    const { files, cloudinaryUrl, publicId } = this.state;

    console.log("SEE", image_url, cloudinaryUrl, publicId, files);
    const thumbs = files.map((file, i) => {
      return (
        <div className="thumb">
          <img src={file.preview} width={200} alt="preview" id={i} />
          <button onClick={() => this.clear(i)}>X</button>
        </div>
      );
    });

    return (
      <div className="blogform-container">
        <div className="blogform-banner">
          <h2>Create</h2>
        </div>
        <form className="form" onSubmit={event => this.onSubmit(event)}>
          <p value={date} onChange={event => this.handleChange(event)}>
            {moment().format("MMMM Do YYYY h:mm:ss")}
          </p>
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
            <Dropzone onDrop={this.onDrop} accept="image/*" multiple>
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
