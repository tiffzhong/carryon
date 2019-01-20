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
import BlogPostSlick from "./BlogPostSlick";
import earth from "../../earth.gif";
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
  // redirectToDashboard() {
  //   window.location.pathname = "/dashboard";
  // }
  render() {
    // console.log(this.state, "STATE");
    // console.log(this.props.blogpost.auth0_id, "PROPS");
    // console.log(this.state.auth0_id, "STATE");
    console.log(this.props.user, "does user show ID?");
    console.log(this.props, "Trying to see Props");
    let { date, title, image_url, blurb, itinerary, name } = this.state;
    let { history, user, deleteBlogPost } = this.props;
    // const allImages =
    //   image_url &&
    //   image_url.map(imageId => {
    //     return <img src={imageId} alt="imageid" />;
    //   });
    console.log(this.state.user, "see DIDIDID");

    return (
      <>
        {this.props.user ? (
          <div className="single-blogpost-container">
            <div className="go-back-arrow">
              <p
                className="blog-post-edit-button"
                onClick={() => history.goBack()}
              >
                <i class="fas fa-long-arrow-alt-left" />
              </p>
            </div>
            <h6>
              {name ? name : null} •{" "}
              {date ? moment(date).format("MMMM Do YYYY h:mm a") : null}
            </h6>
            <div className="blogpost-images-container1">
              <BlogPostSlick images={image_url} />
            </div>
            <div className="title-container">
              <h1>{title ? title : <img src={earth} alt="loading" />}</h1>
            </div>
            <div className="blurb-container">
              <p>{blurb ? blurb : null}</p>
            </div>
            <div className="itinerary-container">
              <h5>{itinerary ? itinerary : null}</h5>
            </div>
            {/* <div className="blogpost-images-container">{allImages}</div> */}

            {user ? (
              <div>
                {user.auth0_id === this.state.auth0_id ? (
                  <Link to={`/blogpost/${this.props.match.params.postid}`}>
                    <p className="blog-post-edit-button">
                      <i class="far fa-edit" />
                    </p>
                  </Link>
                ) : null}
              </div>
            ) : null}

            <p />
          </div>
        ) : null
        // this.redirectToDashboard()
        }
      </>
    );
  }
}

const mapStateToProps = state => {
  let { user, blogpost } = state.blogpost;
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
