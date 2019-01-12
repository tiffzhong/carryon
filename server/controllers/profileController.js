const ABdata = require("../ABquote.json");

module.exports = {
  readQuotes: (req, res) => {
    const { id } = req.params;
    res.status(200).send(ABdata[id]);
  },

  getProfile: (req, res) => {
    const database = req.app.get("db");
    let { id } = req.params;
    // let { auth0_id } = req.params;
    console.log("SHOW REQ.Param", req.params);
    database
      .profile_all_info([id])
      .then(profile => {
        if (profile.length > 0) {
          res.status(200).send(profile[0]);
        } else {
          console.log("the good shit is running", id);
          database.bad_user([id]).then(user => {
            console.log(user, "from get user");
            res.status(200).send(user[0]);
          });
        }
      })
      .catch(error => {
        console.log("error in get_profile", error);
      });
  },

  createProfile: (req, res) => {
    const database = req.app.get("db");
    let { city, about, twitter, instagram } = req.body;
    console.log(city, about, twitter, instagram, "@@@@@@@@@@@@@@");

    database
      .profile_create([city, about, twitter, instagram])
      .then(() => res.status(200).send())
      .catch(error => {
        console.log("error in profile_create", error);
      });
  }

  // editProfile: (req, res) => {
  //   const database = req.app.get("db");
  //   let { about_me, twitter, instagram } = req.body;
  //   const { profileId } = req.params;
  //   console.log(about_me, twitter, instagram);
  //   database
  //     .profile_update([profileId, about_me, twitter, instagram])
  //     .then(() => res.status(200).send())
  //     .catch(error => console.log("Error in profile_update", error));
  //   res.status(200).send();
  // }
};
