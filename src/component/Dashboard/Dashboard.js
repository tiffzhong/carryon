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
    let { blogpostsList } = this.props;
    let displayBlogPosts = blogpostsList.map(blogpost => {
      return (
        <div>
          <Link to="blogpost">
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
  let { blogpostsList, admin } = state;
  return {
    blogpostsList,
    admin
  };
};

const mapDispatchToProps = {
  getAll
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
