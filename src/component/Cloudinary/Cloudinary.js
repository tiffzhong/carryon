import React, { Component } from "react";
import Dropzone from "react-dropzone";
import "./Cloudinary.css";
// import "./Cloudinary.css";
const CLOUDINARY_UPLOAD_PRESET = "carryon";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/tiffz/image/upload";

class Cloudinary extends Component {
  constructor() {
    super();

    this.state = {
      files: [],
      cloudinaryUrl: ""
    };
  }

  onDrop = files => {
    this.setState({
      files: files.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    });
  };

  componentWillUnmount() {
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
  }

  clear = () => {
    this.setState({ files: [], cloudinaryUrl: "" });
  };

  // handleImageUpload(files) {
  //   let upload = request
  //     .post(CLOUDINARY_UPLOAD_URL)
  //     .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
  //     .field("file", files);

  //   upload.end((err, response) => {
  //     if (
  //       response.body.secure_url !== "" ||
  //       response.body.secure_url !== undefined
  //     ) {
  //       let uploadedFiles = response.body.secure_url,
  //         uploadedFileCloudinaryUrl = response.body.secure_url;

  //       this.setState({
  //         ...this.state,
  //         uploadedFiles
  //       });
  //     } else {
  //       console.log(err);
  //     }
  //   });
  // }

  render() {
    console.log("files", this.state.files);
    const { files } = this.state;
    const thumbs = files.map(file => (
      <div className="thumb">
        <img src={file.preview} alt="preview" />
      </div>
    ));

    return (
      <div>
        <Dropzone accept="image/*" onDrop={this.onDrop.bind(this)}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drop files here</p>
            </div>
          )}
        </Dropzone>
        {thumbs}
      </div>
    );
  }
}

export default Cloudinary;
