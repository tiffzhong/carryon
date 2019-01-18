import React from "react";
import { Switch, Route } from "react-router-dom";

import LandingPage from "./component/LandingPage/LandingPage";
import Dashboard from "./component/Dashboard/Dashboard";
import BlogPost from "./component/BlogPost/BlogPost";
import BlogFormEdit from "./component/BlogFormEdit/BlogFormEdit";
import Profile from "./component/Profile/Profile";
import Admin from "./component/Admin/Admin";
import BlogFormCreate from "./component/BlogFormCreate/BlogFormCreate";
import ShopFront from "./component/ShopFront/ShopFront";
import ShopProductDetails from "./component/ShopProductDetails/ShopProductDetails";
import ShoppingCart from "./component/ShoppingCart/ShoppingCart";

export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/dashboard" component={Dashboard} />
    <Route exact path="/profile/:id" component={Profile} />
    <Route path="/post/:postid" component={BlogPost} />
    <Route path="/blogpost/:postid" component={BlogFormEdit} />
    <Route path="/new" component={BlogFormCreate} />
    <Route path="/shop" component={ShopFront} />
    <Route path="/admin" component={Admin} />
    <Route path="/cart" compoment={ShoppingCart} />
    <Route path="/product/:product_id" component={ShopProductDetails} />
  </Switch>
);
