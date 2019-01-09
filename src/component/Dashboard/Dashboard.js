import React, { Component } from "react";
import "./Dashboard.css";
import BlogPost from "../BlogPost/BlogPost";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAll } from "../../ducks/blogpostReducer";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getAll();
  }

  render() {
    // console.log(
    //   "dashboard props",
    //   this.props.blogpostsList.length ? this.props.blogpostsList : "fetching"
    // );
    let { blogpostsList } = this.props;
    console.log(blogpostsList, "info from reducer");
    let displayBlogPosts = blogpostsList.map(blogpost => {
      console.log(blogpost, "blogpost content");
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  let { blogpostsList } = state;
  return {
    blogpostsList
  };
};

export default connect(
  mapStateToProps,
  { getAll }
)(Dashboard);
