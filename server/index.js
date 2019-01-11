const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const massive = require("massive");
//const axios = require("axios");
const dotenv = require("dotenv");
const connect = require("connect-pg-simple");
dotenv.config();
const authController = require("./controllers/authController");
const profileController = require("./controllers/profileController");
const blogpostContoller = require("./controllers/blogpostController");
const adminController = require("./controllers/adminController");

const app = express();
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
  .then(database => {
    app.set("db", database);
  })
  .catch(error => {
    console.log("error with massive", error);
  });

app.use(
  session({
    store: new (connect(session))({
      conString: process.env.CONNECTION_STRING
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2
    }
  })
);

//Auth
app.get("/auth/callback", authController.login);
app.get("/auth/user-data", authController.getUser);
app.post("/auth/logout", authController.logout);

//Profile Tab
app.get("/api/abquote/:id", profileController.readQuotes);

//Dashboard Tab for Blogposts
// app.get("/api/blogposts/:id", blogpostContoller.getMyBlogPosts);
app.get("/api/blogposts", blogpostContoller.getAllBlogPosts);
app.get("/api/blogpost/:id", blogpostContoller.getBlogPost);
app.post("/api/blogpost", blogpostContoller.createBlogPost);
app.put("/api/blogpost/:id", blogpostContoller.updateBlogPost);
app.delete("/api/blogpost/:id", blogpostContoller.deleteBlogPost);

app.post("/api/image/blogpost", blogpostContoller.deletePictureWhenCreate);
//Admin
app.post("/admin/register", adminController.register);
app.post("/admin/login", adminController.login);
app.post("/admin/logout", adminController.logout);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Sever listening on PORT ${PORT}`);
});
