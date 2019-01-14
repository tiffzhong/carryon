import React, { Component } from "react";
import "./BlogPost.css";
import { Link } from "react-router-dom";
import {
  getOne,
  getAllBlogposts,
  deleteBlogPost
} from "../../ducks/blogpostReducer";
import { connect } from "react-redux";
import moment from "moment";
import axios from "axios";

class BlogPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment().format(),
      title: "",
      image_url: [],
      blurb: "",
      itinerary: "",
      name: null,
      auth0_id: null,
      user: null
    };
  }
  componentDidMount() {
    if (this.props.match.params.postid) {
      axios
        .get(`/api/blogpost/${this.props.match.params.postid}`)
        .then(res => {
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
            itinerary: this.props.blogpost.itinerary,
            name: this.props.blogpost.name,
            auth0_id: this.props.blogpost.auth0_id
          });
        })
        .catch(error => console.log("error in getting 1", error));
    }
  }

  render() {
    console.log(this.state, "STATE");
    console.log(this.props.blogpost.auth0_id, "PROPS");
    console.log(this.state.auth0_id, "STATE");
    console.log(this.props, "Trying to see Props");
    let { date, title, image_url, blurb, itinerary, name } = this.state;
    let { history } = this.props;
    const allImages = image_url.map(imageId => {
      return <img src={imageId} alt="imageid" />;
    });

    return (
      <>
        <button onClick={() => history.goBack()}>Go Back</button>
        <div className="single-blogpost-banner" />
        <div className="single-blogpost-container">
          <div className="title-container">
            <h2>{title ? title : "loading"}</h2>
            <p>
              {date ? moment(date).format("MMMM Do YYYY h:mm:ss a") : "loading"}
            </p>

            <h6>by: {name ? name : "loading"}</h6>
          </div>
          <div className="blurb-container">
            <p>{blurb ? blurb : "loading"}</p>
          </div>
          <div className="images-container">{allImages}</div>
          <div className="itinerary-container">
            <h5>Itinerary: {itinerary ? itinerary : "loading"}</h5>
          </div>

          <div>
            {/* {this.props.blogpost.auth0_id === this.state.auth0_id ? (
              <Link to={`/blogpost/${this.props.match.params.postid}`}>
                <button className="edit-button">Edit</button>
              </Link>
            ) : null} */}
          </div>

          <button onClick={() => history.goBack()}>Go Back</button>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  let { user, blogpost } = state;
  return { user, blogpost };
};
const mapDispatchToProps = {
  getOne,
  getAllBlogposts,
  deleteBlogPost
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogPost);
