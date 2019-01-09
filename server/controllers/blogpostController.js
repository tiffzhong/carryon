module.exports = {
  //USERS BLOGPOSTS
  getAllBlogPosts: (req, res) => {
    const database = req.app.get("db");
    const { id } = req.params;
    console.log(id, "id we are querererereygin");
    database
      .get_blogposts(id)
      .then(blogposts => {
        console.log(blogposts, "-----------------");

        res.status(200).send(blogposts);
      })
      .catch(error => {
        res
          .status(500)
          .send({ errorMessage: "Something wrong w get blogposts" });
        console.log(error);
      });
  },

  //GET EVERYONES IN THE DATA BASE
  getFullBlogPosts: (req, res) => {
    const database = req.app.get("db");
    database
      .get_full_blogposts()
      .then(blogposts => {
        console.log(blogposts, "FULL BLOG 000000000000000000000000000");
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
    let { date, title, image_url, blurb, itinerary, user, id } = req.body;
    console.log(
      date,
      title,
      image_url,
      blurb,
      itinerary,
      user,
      id,
      `----------------------------------------------`
    );
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
