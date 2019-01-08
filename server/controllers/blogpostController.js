module.exports = {
  getAllBlogPosts: (req, res) => {
    const database = req.app.get("db");
    database
      .get_blogposts()
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
    let { id, date, title, image_url, blurb, itinerary } = req.body;
    database
      .create_blogpost([id, date, title, `{${image_url}}`, blurb, itinerary])
      .then(() => res.status(200).send())
      .catch(err => {
        console.log("error in creat blogpost", err);
      });
  },
  updateBlogPost: (req, res) => {
    const database = req.app.get("db");
    let { user_id, date, title, image_url, blurb, itinerary } = req.body;
    let { id } = req.params;

    database
      .update_blogpost([
        id,
        user_id,
        date,
        title,
        `{${image_url}}`,
        blurb,
        itinerary
      ])
      .then(() => res.status(200).send())
      .catch(error => console.log("Error in updating blogpost", error));
  },

  deleteBlogPost: (req, res) => {
    const database = req.app.get("db");
    let { id } = req.params;
    database.delete_blogpost(id).then(() => res.status(200).send());
  }
};
