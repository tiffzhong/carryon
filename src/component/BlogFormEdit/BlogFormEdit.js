import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./BlogFormEdit.css";
import { setUser, editBlogPost, getOne } from "../../ducks/blogpostReducer";
import moment from "moment";
import request from "superagent";
import Dropzone from "react-dropzone";
import axios from "axios";

const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/tiffz/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "carryon";

class BlogFormEdit extends Component {
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

  componentDidMount() {
    console.log("POSTID#################", this.props);
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
            date: moment().format(),
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

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // onSubmit(event) {
  //   event.preventDefault();
  // }
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
    console.log("this.props", this.props.blogpost);
    console.log("this.state", this.state);
    // console.log("match", this.props.match.params);
    // console.log("props", this.props);
    const { id } = this.props.blogpost;
    const { editBlogPost } = this.props;

    const thumbs = this.state.image_url.map((file, i) => {
      return (
        <div className="thumb">
          <img src={file} width={200} alt="preview" id={i} />
          <button onClick={() => this.clear(i)}>X</button>
        </div>
      );
    });
    return (
      <>
        <div className="blogform-banner1">
          <h2>Edit</h2>
        </div>
        <div className="blogform-container">
          <div className="blogform">
            <p>{moment().format("MMMM Do YYYY h:mm:ss")}</p>
            <label>Title</label>
            <div className="title-field">
              <input
                name="title"
                type="text"
                value={this.state.title}
                onChange={event => this.handleChange(event)}
              />
            </div>
            <div className="blurb-field">
              <textarea
                placeholder="How was your trip?"
                name="blurb"
                type="text"
                value={this.state.blurb}
                onChange={event => this.handleChange(event)}
              />
            </div>
            <div className="itinerary-field">
              <textarea
                placeholder="itinerary"
                name="itinerary"
                type="text"
                value={this.state.itinerary}
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
            <Link to="/dashboard">
              <button
                onClick={() =>
                  editBlogPost(
                    this.state.date,
                    this.state.title,
                    this.state.image_url,
                    this.state.blurb,
                    this.state.itinerary,
                    id
                  )
                }
              >
                Edit
              </button>
            </Link>
          </div>
        </div>
      </>
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
  { setUser, editBlogPost, getOne }
)(BlogFormEdit);
