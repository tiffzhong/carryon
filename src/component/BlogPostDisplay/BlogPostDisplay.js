import React, { Component } from "react";
import "./BlogPostDisplay.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllBlogposts } from "../../ducks/blogpostReducer";
import Notifications from "./Notifications";

function BlogPostDisplay (props) {

    return (
      <>

        <div className="dashboard-container">
          <div className="create-new">
            <Link to="/new">
              <button className="add-new">Create a new post</button>
            </Link>
          </div>

          <div className="blogposts-container">
            <div className="your-trips">
              <h4>Your Trips</h4>
              {allOfMyBlogposts}
            </div>

            <div className="your-feed">
              <h4>Your Feed</h4>
              {displayBlogPosts}
            </div>

            <div className="your-notifications">
              <h4>Notifications</h4>
              <Notifications />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  let { user, allBlogposts } = state;
  return {
    user,
    allBlogposts
  };
};

export default connect(
  mapStateToProps,
  { getAllBlogposts }
)(Dashboard);
