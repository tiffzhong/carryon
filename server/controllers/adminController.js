const bcrypt = require("bcrypt");
const saltRounds = 12;

module.exports = {
  register: (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    bcrypt.hash(password, saltRounds).then(hash => {
      db.admin_create([username, hash])
        .then(() => {
          req.session.user = { username };
          res.json({ user: req.session.user });
        })
        .catch(error => {
          console.log("error", error);
          res.status(500).json({ message: "Something bad happened! " });
        });
    });
  },
  login: (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    db.admin_find([username]).then(users => {
      if (users.length) {
        bcrypt.compare(password, users[0].password).then(passwordsMatch => {
          if (passwordsMatch) {
            req.session.user = { username: users[0].username };
            res.json({ user: req.session.user });
          } else {
            res.status(403).json({ message: "Wrong password" });
          }
        });
      } else {
        res.status(403).json({ message: "That user is not registered" });
      }
    });
  },
  logout: (req, res) => {
    req.session.destroy();
    res.status(200).send();
  }
};
