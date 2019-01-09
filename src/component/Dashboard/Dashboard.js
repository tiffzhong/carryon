import React, { Component } from "react";
import "./Dashboard.css";
import BlogPost from "../BlogPost/BlogPost";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getFullBlogPosts } from "../../ducks/blogpostReducer";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      post: []
    };
  }

  componentDidMount() {
    this.props.getFullBlogPosts().then(post => {
      console.log(post, "posterrrururururur");
      this.setState({
        post: this.props.fullBlogposts
      });
    });
  }

  render() {
    console.log(this.props.user, "dashboard props");

    ///GETTING MY POSTS ONLY!!!
    let { blogpostsList, fullBlogposts } = this.props;
    console.log(blogpostsList, "info from reducer");
    let displayMyBlogPosts =
      fullBlogposts.length > 0 &&
      fullBlogposts.filter(myBlogpost => {
        console.log("FILTERRRR returning asldkfaksl;d", myBlogpost);
        return myBlogpost.auth0_id === this.props.user.auth0_id;
      });

    let allOfMyBlogposts =
      displayMyBlogPosts.length > 0 &&
      displayMyBlogPosts.map(onlyMyBlogposts => {
        console.log(onlyMyBlogposts, "PLEASE WORK");

        return (
          <div className="dashboard-container">
            <div className="blogpost-container">
              <BlogPost {...onlyMyBlogposts} id={onlyMyBlogposts.id} />
            </div>
          </div>
        );
      });

    ///GEETTING EVERYONES POSTS
    let displayBlogPosts =
      fullBlogposts.length > 0 &&
      fullBlogposts.map(blogpost => {
        return (
          <div className="dashboard-container">
            <div className="blogpost-container">
              <BlogPost {...blogpost} id={blogpost.id} />
            </div>
          </div>
        );
      });
    return (
      <div className="dashboard-container">
        <div className="dashboard-banner">
          <h2>Dashboard</h2>
        </div>
        <div className="create-new">
          <Link to="/new">
            <button className="add-new">Create a new post</button>
          </Link>
        </div>
        {displayBlogPosts}

        <div>
          <p>------------------------------only tiffs</p>
          {allOfMyBlogposts}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { blogpostsList, user, fullBlogposts } = state;
  return {
    blogpostsList,
    user,
    fullBlogposts
  };
};

export default connect(
  mapStateToProps,
  { getFullBlogPosts }
)(Dashboard);
