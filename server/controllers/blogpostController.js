const axios = require("axios");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "tiffz",
  api_key: "152969667534373",
  api_secret: "KUiyfnNgFdvX3S1cV-DuoRcj8nE"
});

module.exports = {
  //GET EVERYONES IN THE DATA BASE
  getAllBlogPosts: (req, res) => {
    const database = req.app.get("db");
    database
      .get_all_blogposts()
      .then(blogposts => {
        res.status(200).send(blogposts);
      })
      .catch(error => {
        res
          .status(500)
          .send({ errorMessage: "Something wrong w get blogposts" });
        console.log(error);
      });
  },

  getBlogPost: (req, res) => {
    const database = req.app.get("db");
    let { id } = req.params;
    console.log("showmeiD", id);
    database
      .get_blogpost(id)
      .then(blogpost => {
        res.status(200).send(blogpost[0]);
      })
      .catch(err => {
        console.log("error in get blog blogpost", err);
      });
  },

  createBlogPost: (req, res) => {
    const database = req.app.get("db");
    let { date, title, image_url, blurb, itinerary, user, id } = req.body;
    console.log(date, title, image_url, blurb, itinerary, user, id);
    database
      .create_blogpost([
        id,
        date,
        title,
        `{${image_url}}`,
        blurb,
        itinerary,
        user
      ])
      .then(() => res.status(200).send())
      .catch(err => {
        console.log("error in create blogpost", err);
      });
  },
  updateBlogPost: (req, res) => {
    const database = req.app.get("db");
    let { date, title, image_url, blurb, itinerary } = req.body;
    let { id } = req.params;
    console.log(
      date,
      title,
      image_url,
      blurb,
      itinerary,
      id,
      "$$$$$$$$$$$$$$$$$$$$$$$$$$"
    );

    database
      .update_blogpost([id, date, title, `{${image_url}}`, blurb, itinerary])
      .then(() => res.status(200).send())
      .catch(error => console.log("Error in updating blogpost", error));
  },

  deleteBlogPost: (req, res) => {
    const database = req.app.get("db");
    let { id } = req.params;
    database.delete_blogpost(id).then(() => res.status(200).send());
  },

  deletePictureWhenCreate: (req, res) => {
    let { publicId } = req.body;
    cloudinary.v2.api.delete_resources([publicId], function(error, result) {
      res.status(200).send(result);
    });

    // axios
    //   .delete(
    //     `https://api.cloudinary.com/v1_1/tiffz/delete_by_token/${publicId}/${deleteImage}`
    //   )
    //   .then(response => {
    //     res.status(200).send(response);
    //   });
  }
};
