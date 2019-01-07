import React from "react";
import { Switch, Route } from "react-router-dom";

import LandingPage from "./component/LandingPage/LandingPage";
import Dashboard from "./component/Dashboard/Dashboard";
import BlogPost from "./component/BlogPost/BlogPost";
import BlogForm from "./component/BlogForm/BlogForm";
import StoreProducts from "./component/StoreProducts/StoreProducts";
import Profile from "./component/Profile/Profile";
import Admin from "./component/Admin/Admin";

export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/profile" component={Profile} />
    <Route path="/post/:postid" component={BlogPost} />
    <Route path="/blogpost/:postid" component={BlogForm} />
    <Route path="/shop" component={StoreProducts} />
    <Route path="/admin" component={Admin} />
  </Switch>
);
