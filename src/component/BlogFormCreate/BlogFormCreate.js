import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./BlogFormCreate.css";
import { setUser, createBlogPost } from "../../ducks/blogpostReducer";
import moment from "moment";
import request from "superagent";
import Dropzone from "react-dropzone";
import axios from "axios";

import styled from "styled-components";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

const CLOUDINARY_UPLOAD_PRESET = "carryon";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/tiffz/image/upload";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 5
};

const thumb = {
  display: "inline-flex",
  marginBottom: 5,
  marginRight: 5,
  width: 120,
  height: 120
};
const Button = styled.button`
  width: 20px;
  height: 20px;
  border: none;
  color: black;
`;

const thumbInner = {
  display: "flex",
  flexWrap: "wrap",
  // minWidth: 0,
  overflow: "hidden"
};

const img = {
  // display: "block"
  width: "auto",
  height: "100%"
};

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
      publicId: [],
      percent: 100
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
    if (this.state.files.length === 0 || this.state.files.length) {
      // Copy Files array in state
      var copy = this.state.files.slice();
      var otherFiles = files.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
      // Combine copy and otherFiles array
      let newArray = [...copy, ...otherFiles];
      this.setState({
        files: newArray
      });
      // } else {
      //   let newFiles = this.state.files.slice();
      //   newFiles.push(files);
      //   this.setState({
      //     files: newFiles
      //   });
    }
    this.handleImageUpload(files);
  };

  clear = id => {
    let body = {
      publicId: this.state.publicId[id]
    };
    axios.post("/api/image/blogpost", body).then(response => {
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
    });
  };

  handleImageUpload(files) {
    const eachFileUrl = files.forEach(file => {
      let upload = request
        .post(CLOUDINARY_UPLOAD_URL)
        .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
        .field("file", file)
        .on(
          "progress",
          function(e) {
            this.setState({ percent: e.percent });
          }.bind(this)
        );

      upload.end((err, response) => {
        if (err) {
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

  componentWillUnmount() {
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
  }

  render() {
    const { date, title, image_url, blurb, itinerary } = this.state;
    const { createBlogPost, user } = this.props;
    const { files } = this.state;

    let thumbs = files.map((file, i) => (
      <div style={thumb} key={i}>
        <div style={thumbInner}>
          <Button onClick={() => this.clear(i)}>X</Button>
          <img src={file.preview} style={img} alt="" />
        </div>
      </div>
    ));

    return (
      <div className="entire-create-blogform-container">
        <div className="blogform-banner">
          <h2>Create</h2>
        </div>
        <div className="create-blogform-form">
          <form onSubmit={event => this.onSubmit(event)}>
            <p value={date} onChange={event => this.handleChange(event)}>
              {moment().format("MMMM Do YYYY h:mm a")}
            </p>

            <div className="create-title-field">
              <input
                placeholder="Title"
                name="title"
                type="text"
                value={title}
                onChange={event => this.handleChange(event)}
              />
            </div>

            <div className="create-blurb-field">
              <textarea
                placeholder="How was your trip?"
                name="blurb"
                type="text"
                value={blurb}
                onChange={event => this.handleChange(event)}
              />
            </div>

            <div className="create-itinerary-field">
              <textarea
                placeholder="Your Itinerary"
                name="itinerary"
                type="text"
                value={itinerary}
                onChange={event => this.handleChange(event)}
              />
            </div>

            <div className="photo-area-create">
              <Dropzone onDrop={this.onDrop} accept="image/*">
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <span>Click or Drop Your Photos Here!</span>
                  </div>
                )}
              </Dropzone>

              {this.state.percent < 100 ? (
                <div style={{ margin: 10, width: 300 }}>
                  <Progress
                    percent={this.state.percent}
                    theme={{
                      success: {
                        symbol: "🤩",
                        color: "#7fb25b"
                      },
                      active: {
                        symbol: "🌎",
                        color: "#2d3fb2"
                      },
                      default: {
                        symbol: "😬",
                        color: "#fbc630"
                      }
                    }}
                  />
                  {/* <Line strokeWidth="10" percent={this.state.percent} /> */}
                </div>
              ) : (
                <aside style={thumbsContainer}>{thumbs}</aside>
              )}
            </div>

            <div className="post-button-create">
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
                  Post
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { blogpost, user } = state.blogpost;
  return {
    blogpost,
    user
  };
};

export default connect(
  mapStateToProps,
  { setUser, createBlogPost }
)(BlogFormCreate);
