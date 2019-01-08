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
  componentDidMount() {
    let date = moment().format("MMMM DD YYYY");
    if (this.props.match.params.postid) {
      axios
        .get(`/api/blogpost/${this.props.match.params.postid}`)
        .then(res => {
          console.log("res.data", res.data);
          //red.data returns an array of one
          return this.props.getOne(res.data);
        })
        .then(() => {
          this.setState({
            user: this.props.blogpost.user,
            date: date,
            title: this.props.blogpost.title,
            image_url: this.props.blogpost.image_url,
            blurb: this.props.blogpost.blurb,
            itinerary: this.props.blogpost.itinerary
          });
          console.log("hellllllooooooo", this.props.blogpost);
        })
        .catch(error => console.log("error in getting 1", error));
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit(event) {
    event.preventDefault();
  }

  render() {
    // console.log("this.props.user.name", this.props);
    // console.log("match", this.props.match.params);
    // console.log("props", this.props);
    const {
      user,
      date,
      title,
      image_url,
      blurb,
      itinerary,
      uploadedPhotos
    } = this.props.blogpost;
    const { editBlogPost } = this.props;
    let { id } = this.props.match.params;

    return (
      <div className="blogform-container">
        <div className="blogform-banner">
          <h2>Edit</h2>
        </div>
        <div className="blogform">
          <p>{moment(date).format("MMMM Do YYYY")}</p>
          <label>Title</label>
          <div className="title-field">
            <input
              name="title"
              type="text"
              value={title}
              onChange={event => this.handleChange(event)}
            />
          </div>
          <div className="blurb-field">
            <label>Blurb</label>
            <input
              name="blurb"
              type="text"
              value={blurb}
              onChange={event => this.handleChange(event)}
            />
          </div>
          <div className="itinerary-field">
            <label>Itinerary</label>
            <input
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
                editBlogPost(date, title, image_url, blurb, itinerary, user, id)
              }
            >
              Edit
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { blogpostsList, blogpost, user } = state;
  return {
    blogpostsList,
    blogpost,
    user
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
