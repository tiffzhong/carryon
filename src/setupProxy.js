const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use("/auth", proxy({ target: "http://localhost:9090" }));
  app.use("/api", proxy({ target: "http://localhost:9090" }));
  app.use("/callback", proxy({ target: "http://localhost:9090" }));
  app.use("/save-stripe-token", proxy({ target: "http://localhost:9090" }));
};
