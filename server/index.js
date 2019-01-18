const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const massive = require("massive");

const dotenv = require("dotenv");
const connect = require("connect-pg-simple");
dotenv.config();

//Controllers
const authController = require("./controllers/authController");
const profileController = require("./controllers/profileController");
const blogpostContoller = require("./controllers/blogpostController");
const adminController = require("./controllers/adminController");
const clientController = require("./controllers/clientController");
const productsController = require("./controllers/productsController");
const cartController = require("./controllers/cartController");
const app = express();
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/../build`));

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
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

//Nodemailer
app.post("/api/email/newsletter", clientController.sendNewsLetter);

//Auth
app.get("/auth/callback", authController.login);
app.get("/auth/user-data", authController.getUser);
app.post("/auth/logout", authController.logout);

//Profile
app.get("/api/abquote/:id", profileController.readQuotes);
app.get("/api/profile/:id", profileController.getProfile);
app.put("/api/profile/:user_id", profileController.editProfile);

//Blogposts
app.get("/api/blogposts", blogpostContoller.getAllBlogPosts);
app.get("/api/blogpost/:id", blogpostContoller.getBlogPost);
app.post("/api/blogpost", blogpostContoller.createBlogPost);
app.delete("/api/blogpost/:id", blogpostContoller.deleteBlogPost);
app.put("/api/blogpost/:id", blogpostContoller.updateBlogPost);
app.post("/api/image/blogpost", blogpostContoller.deletePictureWhenCreate);

//Admin
app.post("/admin/register", adminController.register);
app.post("/admin/login", adminController.login);
app.post("/admin/logout", adminController.logout);

//Products
app.get("/api/products", productsController.getAllProducts);
app.get("/api/product/:product_id", productsController.getOneProduct);
app.post("/api/product", productsController.createProduct);
app.delete("/api/product/:product_id", productsController.deleteProduct);
app.put("/api/product/:product_id", productsController.updateProduct);

//Cart
app.get("/api/user/cart", cartController.getCart);
app.post("/api/user/cart", cartController.addToCart);
app.delete("/api/user/cart/:product_id", cartController.removeFromCart);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Sever listening on PORT ${PORT}`);
});

const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});
