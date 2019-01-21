import React, { Component } from "react";
import "./Profile.css";
import axios from "axios";
import { connect } from "react-redux";
import { setUser, getAllBlogposts } from "../../ducks/blogpostReducer";
import ProfileModal from "./ProfileModal";
import BlogPostDisplay from "../BlogPostDisplay/BlogPostDisplay";
import twitter from "./twitter.png";
import instagram from "./insta.png";
import earth from "../../earth.gif";
class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      picture: "",
      city: "",
      about: "",
      twitter: "",
      instagram: "",
      quote: [],
      id: null,
      display: false,
      posts: [],
      authy_zero: ""
    };
  }

  showModal = () => {
    this.setState({ display: true });
  };
  hideModal = () => {
    this.setState({ display: false });
  };

  componentDidMount() {
    this.setProfile();
    this.getPostsToShowOnProfile();
    this.newQuote();
    axios.get("/auth/user-data").then(response => {
      this.props.setUser(response.data.user);
    });
  }

  getPostsToShowOnProfile = () => {
    this.props.getAllBlogposts().then(post => {
      this.setState({
        posts: this.props.allBlogposts
      });
    });
  };
  newQuote = id => {
    let randomid = Math.floor(Math.random() * (32 - 1) + 1);
    axios.get(`/api/abquote/${randomid}`).then(res => {
      this.setState({
        quote: res.data.quote
      });
    });
  };

  setProfile = id => {
    axios.get(`/api/profile/${this.props.match.params.id}`).then(res => {
      console.log("sHARROOOOOAROSKLJ", res.data);
      this.setState({
        id: res.data.id,
        name: res.data.name,
        picture: res.data.picture,
        city: res.data.city,
        about: res.data.about,
        twitter: res.data.twitter,
        instagram: res.data.instagram,
        authy_zero: res.data.auth0_id
      });
    });
  };

  render() {
    console.log(this.state, "STATEUREURUERUERE");
    const { user } = this.props;

    const profileInformation = (
      <ProfileModal
        user_id={this.state.id}
        display={this.state.display}
        city={this.state.city}
        about={this.state.about}
        twitter={this.state.twitter}
        instagram={this.state.instagram}
        hideModal={this.hideModal}
      />
    );

    console.log(this.props.allBlogposts, "display PROPSSSSSS");
    console.log(this.props.user, "is it here");
    let { allBlogposts } = this.props;
    let displayMyBlogPosts =
      allBlogposts.length > 0 &&
      allBlogposts.filter(myBlogpost => {
        console.log(myBlogpost, "myBlogposteh");
        return myBlogpost.auth0_id == this.state.authy_zero;
      });

    let allOfMyBlogposts =
      displayMyBlogPosts.length > 0 &&
      displayMyBlogPosts.map(onlyMyBlogposts => {
        return <BlogPostDisplay {...onlyMyBlogposts} />;
      });
    return (
      <div className="profile-page">
        {this.state.display ? profileInformation : null}

        <div className="profile-banner">
          <h2>Profile</h2>
        </div>

        <div className="profile-container">
          {user ? (
            <div className="huge-container">
              <div className="greeting">
                <h1>Welcome back!</h1>
              </div>

              <div className="profile-left-side">
                {this.state.picture ? (
                  <img src={this.state.picture} alt="photo" />
                ) : (
                  <img src={earth} alt="photo" />
                )}
                <div className="image-and-city">
                  <p>{this.state.name}</p>
                  <span onClick={this.showModal}>
                    +
                    {this.state.city
                      ? this.state.city
                      : "Add your current city"}
                  </span>
                </div>
              </div>

              <div className="about-me">
                <span onClick={this.showModal}>
                  +
                  {this.state.about
                    ? this.state.about
                    : "Write some details about yourself"}
                </span>
              </div>
              <div className="social-media-icons">
                <div className="twitter">
                  <a
                    href={
                      this.state.twitter
                        ? `www.twitter.com/${this.state.twitter}`
                        : "www.twitter.com"
                    }
                    target="_blank"
                    rel="twitter"
                  >
                    <img src={twitter} alt="" />
                  </a>
                </div>
                <div className="instagram">
                  {/* <span onClick={this.showModal}> */}
                  <a
                    href={
                      this.state.instagram
                        ? `www.instagram.com/${this.state.instagram}`
                        : "www.instagram.com"
                    }
                    target="_blank"
                    rel="instagram"
                  >
                    <img src={instagram} alt="" />
                  </a>

                  {/* <img src={instagram} />+
                    {this.state.instagram
                      ? this.state.instagram
                      : "Add Instagram"} */}
                  {/* </span> */}
                </div>
              </div>

              <div className="profile-right-side">
                <div className="latest-post">
                  <h2>{this.state.name}'s Latest Posts</h2>
                </div>
                <div className="all-posts-on-profile">{allOfMyBlogposts}</div>
              </div>
            </div>
          ) : (
            <div>Please log in</div>
          )}
        </div>
        <div className="ab-container">
          <div className="his-quote">{this.state.quote}</div>
          <div className="his-name">-Anthony Bourdain</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { user, allBlogposts, blogpost } = state.blogpost;
  return {
    user,
    blogpost,
    allBlogposts
  };
}
export default connect(
  mapStateToProps,
  { setUser, getAllBlogposts }
)(Profile);
