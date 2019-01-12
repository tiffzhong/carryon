const axios = require("axios");

module.exports = {
  login: (req, res) => {
    const { code } = req.query;
    console.log("code", code);
    const payload = {
      client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      code,
      grant_type: `authorization_code`,
      redirect_uri: `http://${req.headers.host}/auth/callback`
    };
    function tradeCodeForAccessToken() {
      return axios.post(
        `https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`,
        payload
      );
    }

    function tradeAccessTokenForUserInfo(response) {
      console.log("response.data.access_token", response.data.access_token);
      return axios.get(
        `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userInfo?access_token=${
          response.data.access_token
        }`
      );
    }

    function storeUserInfoInDatabase(response) {
      console.log("user info", response.data);
      const user = response.data;
      const db = req.app.get("db");
      return db.get_user(user.sub).then(users => {
        console.log("user info", users);
        if (users.length) {
          req.session.user = {
            id: users[0].id,
            name: users[0].name,
            email: users[0].email,
            picture: users[0].picture,
            auth0_id: users[0].auth0_id
          };
          res.redirect("/dashboard");
        } else {
          return db
            .create_user([user.name, user.email, user.picture, user.sub])
            .then(newUsers => {
              console.log();
              req.session.user = newUsers[0];
              res.redirect("/dashboard");
            });
        }
      });
    }
    tradeCodeForAccessToken()
      .then(tradeAccessTokenForUserInfo)
      .then(storeUserInfoInDatabase)
      .catch(error => {
        console.log("error in login route", error);
        res.status(500).send("something went wrong w the server");
      });
  },
  getUser: (req, res) => {
    res.json({ user: req.session.user });
  },

  logout: (req, res) => {
    req.session.destroy();
    res.send().redirect("/");
  }
};
