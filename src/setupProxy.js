const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use("/auth", proxy({ target: "http://localhost:1010" }));
  app.use("/api", proxy({ target: "http://localhost:1010" }));
  app.use("/callback", proxy({ target: "http://localhost:1010" }));
  app.use("/save-stripe-token", proxy({ target: "http://localhost:1010" }));
};
