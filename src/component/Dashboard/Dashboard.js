import React, { Component } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllBlogposts } from "../../ducks/blogpostReducer";
import News from "./News";
import BlogPostDisplay from "../BlogPostDisplay/BlogPostDisplay";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.grabUser();
  }
  // redirectToLandingPage() {
  //   window.location.pathname = "/";
  // }

  grabUser = () => {
    this.props.getAllBlogposts().then(post => {
      this.setState({
        posts: this.props.allBlogposts
      });
    });
  };
  render() {
    console.log(this.props.user, "USER");
    ///GETTING MY BLOGPOSTS ONLY!!!
    let { allBlogposts } = this.props;
    let displayMyBlogPosts =
      allBlogposts.length > 0 &&
      allBlogposts.filter(myBlogpost => {
        return myBlogpost.auth0_id === this.props.user.auth0_id;
      });

    let allOfMyBlogposts =
      displayMyBlogPosts.length > 0 &&
      displayMyBlogPosts.map(onlyMyBlogposts => {
        return (
          <div className="dashboard-container">
            <div className="blogpost-container">
              <BlogPostDisplay
                {...onlyMyBlogposts}
                auth={this.props.user.auth0_id}
                id={onlyMyBlogposts.id}
              />
            </div>
          </div>
        );
      });

    ///GETTING ALL BLOGPOSTS
    let displayBlogPosts =
      allBlogposts.length > 0 &&
      allBlogposts.map(blogpost => {
        console.log("blogpost letmwlekjalksdf", blogpost);
        return (
          <div className="dashboard-container">
            <div className="blogpost-container">
              <BlogPostDisplay {...blogpost} id={blogpost.id} />
            </div>
          </div>
        );
      });
    return (
      <div className="the-entire-dashboard">
        {this.props.user ? (
          <>
            <div className="dashboard-banner">
              <h2>Dashboard</h2>
            </div>

            <div className="create-new">
              <Link to="/new">
                <button>New Post</button>
              </Link>
            </div>
            <div className="search-bar">
              <input placeholder="search destinations" />
              <button>Search</button>
            </div>
            <div className="ALL-POSTS-CONTAINER">
              <div className="your-trips">
                Your Trips
                {allOfMyBlogposts}
              </div>

              <div className="your-feed">
                Feed
                {displayBlogPosts}
              </div>

              <div className="your-news">
                World Wide News
                <News />
              </div>
            </div>
          </>
        ) : null
        // this.redirectToLandingPage()
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { user, allBlogposts } = state.blogpost;
  return {
    user,
    allBlogposts
  };
};

export default connect(
  mapStateToProps,
  { getAllBlogposts }
)(Dashboard);
