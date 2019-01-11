import React from "react";
import { Switch, Route } from "react-router-dom";

import LandingPage from "./component/LandingPage/LandingPage";
import Dashboard from "./component/Dashboard/Dashboard";
import BlogPost from "./component/BlogPost/BlogPost";
import BlogFormEdit from "./component/BlogFormEdit/BlogFormEdit";
import StoreProducts from "./component/StoreProducts/StoreProducts";
import Profile from "./component/Profile/Profile";
import Admin from "./component/Admin/Admin";
import BlogFormCreate from "./component/BlogFormCreate/BlogFormCreate";
import ProfileForm from "./component/Profile/ProfileForm";

export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/dashboard" component={Dashboard} />
    <Route exact path="/profile/:id" component={Profile} />
    <Route path="/editprofile/:id" component={ProfileForm} />
    <Route path="/post/:postid" component={BlogPost} />
    <Route path="/blogpost/:postid" component={BlogFormEdit} />
    <Route path="/new" component={BlogFormCreate} />
    <Route path="/shop" component={StoreProducts} />
    <Route path="/admin" component={Admin} />
  </Switch>
);
