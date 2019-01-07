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
    console.log("dashboard props", this.props.blogpostsList);
    let { blogpostsList } = this.props;
    let displayBlogPosts = blogpostsList.map(blogpost => {
      return (
        <div>
          <Link to="/blogpost">
            <button className="add-new">Create a new post</button>
          </Link>
          <BlogPost {...blogpost} id={blogpost.id} />
        </div>
      );
    });
    return (
      <div className="dashboard-container">
        <div className="dashboard-banner">
          <h2>Dashboard</h2>
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
