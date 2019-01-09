import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./BlogFormCreate.css";
import { setUser, createBlogPost } from "../../ducks/blogpostReducer";
import moment from "moment";
import request from "superagent";
import Dropzone from "react-dropzone";
import Cloudinary from "../Cloudinary/Cloudinary";

// const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/tiffz/upload";
// const CLOUDINARY_UPLOAD_PRESET = "carryon";

class BlogFormCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment().format("MMMM Do YYYY"),
      title: "",
      image_url: [],
      blurb: "",
      itinerary: ""
      // uploadedFileCloudinaryUrl: "",
      // uploadedFiles: []
    };

    // date,
    // title,
    // image_url,
    // blurb,
    // itinerary,
    // user.auth0_id
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();
  }

  // ------------------START CLOUDINARY METHODS------------------
  // dropImage = files => {
  //   this.setState({
  //     uploadedFiles: files
  //   });
  //   this.onDrop(files);
  // };

  // onDrop = files => {
  //   let upload = request
  //     .post(CLOUDINARY_UPLOAD_URL)
  //     .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
  //     .field("uploadedFiles", files);
  //   console.log("files", files);
  //   console.log("upload", upload);
  //   upload.end((err, res) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     if (res.body.secure_url !== "") {
  //       console.log("res", res.body.secure_url);
  //       this.setState({
  //         uploadedFileCloudinaryUrl: res.body.secure_url,
  //         uploadedFiles: files
  //       });
  //     }
  //   });
  // };
  // ------------------END CLOUDINARY METHODS------------------

  render() {
    console.log("this.props.user", this.props.user);
    console.log("match", this.props.match.params);
    console.log("state", this.state, this.state.date, "is date working");
    const { date, title, image_url, blurb, itinerary } = this.state;
    const { createBlogPost, user } = this.props;
    let { id } = this.props.match.params;

    // let mappedCloudinaryPhotos = uploadedFiles.map(file => {
    //   return (
    //     <div>
    //       {uploadedFileCloudinaryUrl === "" ? null : (
    //         <div>
    //           <p>{file.name} </p>
    //         </div>
    //       )}
    //     </div>
    //   );
    // });
    // const { user } = this.props;
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
            <input
              placeholder="How was your trip?"
              name="blurb"
              type="text"
              value={blurb}
              onChange={event => this.handleChange(event)}
            />
          </div>

          <div className="itinerary-field">
            <input
              placeholder="itinerary"
              name="itinerary"
              type="text"
              value={itinerary}
              onChange={event => this.handleChange(event)}
            />
          </div>

          <label>Photos:</label>
          <div>
            {/* <Dropzone
              multiple={true}
              accept="image/*"
              onDrop={() => this.onDrop()}
            >
              <p>Drop an image or click to select a file to upload.</p>
            </Dropzone> */}
            {/* <Dropzone onDrop={this.onDrop}>
              {({ getRootProps, getInputProps, isDragActive }) => {
                return (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>Drop files here...</p>
                    ) : (
                      <p>
                        Try dropping some files here, or click to select files
                        to upload.
                      </p>
                    )}
                  </div>
                );
              }}
            </Dropzone>

            {mappedCloudinaryPhotos} */}
            <Cloudinary />
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
