import React, { Component } from "react";
import "./Dashboard.css";
import BlogPost from "../BlogPost/BlogPost";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllBlogposts } from "../../ducks/blogpostReducer";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      posts: []
    };
  }

  componentDidMount() {
    this.props.getAllBlogposts().then(post => {
      this.setState({
        posts: this.props.allBlogposts
      });
    });
  }
  // this.props.getMyBlogposts().then(myPosts => {
  //   console.log(myPosts, "MINE");
  //   this.setState({
  //     myPosts: myPosts
  //   });
  // });

  // componentDidUpdate = prevProps => {
  //   if (prevProps.user !== this.props.user) {
  //     this.getTheStuff(this.state.user.auth0_id);
  //     this.setState({
  //       user: this.props.user
  //     });
  //   }
  // };

  // getTheStuff = notId => {
  //   console.log(notId, "asldkfjapioseuhfpioasdhjfpkajsdhfplkj");
  //   this.props.getAll(notId);
  // };

  render() {
    console.log(this.props.user, "dashboard props");

    // this.state.user > 0 && this.getTheStuff(this.state.user.auth0_id);

    // if (this.state.user) {
    //   this.getTheStuff(this.props.user.auth0_id0);
    // }

    // console.log(
    //   "dashboard props",
    //   this.props.blogpostsList.length ? this.props.blogpostsList : "fetching"
    // );

    // -------

    ///GETTING MY BLOGPOSTS ONLY!!!
    let { allBlogposts } = this.props;
    let displayMyBlogPosts =
      allBlogposts.length > 0 &&
      allBlogposts.filter(myBlogpost => {
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

    ///GETTING ALL BLOGPOSTS
    let displayBlogPosts =
      allBlogposts.length > 0 &&
      allBlogposts.map(blogpost => {
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

        <div className="blogposts-container">
          <div className="your-trips">
            <h4>Your Trips</h4>
            {allOfMyBlogposts}
          </div>

          <div className="your-feed">
            <h4>Your Feed</h4>
            {displayBlogPosts}
          </div>
        </div>
      </div>
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
