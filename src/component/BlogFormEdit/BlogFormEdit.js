import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./BlogFormEdit.css";
import { setUser, editBlogPost, getOne } from "../../ducks/blogpostReducer";
import moment from "moment";
import request from "superagent";
import Dropzone from "react-dropzone";
import axios from "axios";
import styled from "styled-components";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/tiffz/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "carryon";
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 5
};

const thumb = {
  display: "inline-flex",
  // borderRadius: 2,
  // border: "1px solid #eaeaea",
  marginBottom: 5,
  marginRight: 5,
  width: 120,
  height: 120
  // padding: 5
  // boxSizing: "border-box"
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
  display: "block",
  width: "100",
  height: "100%"
};
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
      publicId: [],
      percent: 100
    };
  }

  componentDidMount() {
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
        .field("file", file)
        .on(
          "progress",
          function(e) {
            this.setState({ percent: e.percent });
          }.bind(this)
        );

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
  componentWillUnmount() {
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
  }

  render() {
    console.log("this.props", this.props.blogpost);
    console.log("this.state", this.state);
    // console.log("match", this.props.match.params);
    // console.log("props", this.props);
    const { id } = this.props.blogpost;
    const { editBlogPost } = this.props;

    const thumbs = this.state.image_url.map((file, i) => (
      <div style={thumb} key={i}>
        <div style={thumbInner}>
          <Button onClick={() => this.clear(i)}>X</Button>
          <img src={file} style={img} id={i} />
        </div>
      </div>
    ));

    return (
      <div className="entire-create-blogform-container">
        <div className="blogform-banner1">
          <h2>Edit</h2>
        </div>

        <div className="edit-blogform-container">
          <div className="edit-blogform">
            <p>{moment().format("MMMM Do YYYY h:mm a")}</p>

            <div className="edit-title-field">
              <input
                placeholder="Title"
                name="title"
                type="text"
                value={this.state.title}
                onChange={event => this.handleChange(event)}
              />
            </div>

            <div className="edit-blurb-field">
              <textarea
                placeholder="How was your trip?"
                name="blurb"
                type="text"
                value={this.state.blurb}
                onChange={event => this.handleChange(event)}
              />
            </div>

            <div className="edit-itinerary-field">
              <textarea
                placeholder="itinerary"
                name="itinerary"
                type="text"
                value={this.state.itinerary}
                onChange={event => this.handleChange(event)}
              />
            </div>

            <div className="photo-area-edit">
              <Dropzone onDrop={this.onDrop} accept="image/*" multiple>
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
          </div>

          <div className="post-button-edit">
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
  { setUser, editBlogPost, getOne }
)(BlogFormEdit);
