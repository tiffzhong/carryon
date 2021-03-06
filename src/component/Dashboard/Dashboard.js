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

  grabUser = () => {
    this.props.getAllBlogposts().then(post => {
      this.setState({
        posts: this.props.allBlogposts
      });
    });
  };
  render() {
    ///GETTING MY BLOGPOSTS ONLY
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
        return (
          <div className="your-feed-blogposts">
            <BlogPostDisplay {...blogpost} id={blogpost.id} />
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
                <button>
                  New Post <i class="fas fa-plus" />
                </button>
              </Link>
            </div>

            <div className="title-of-feed-container">
              <h3>
                <i class="fas fa-plane" /> Your Posts
              </h3>
              <div className="your-trips">{allOfMyBlogposts}</div>
              <h3>
                <i class="fas fa-plane" /> Explore Trips
              </h3>
              <div className="your-feed">{displayBlogPosts}</div>
              <h3>
                <i class="fas fa-plane" /> On the News
              </h3>
              <div className="your-news">
                <News />
              </div>
            </div>
          </>
        ) : (
          <div>Please Log In to View your Dashboard!</div>
        )}
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
