module.exports = {
  getComments: (req, res) => {
    const database = req.app.get("db");
    database
      .comments_get_all()
      .then(comments => {
        res.status(200).send(comments);
      })
      .then(() => res.status(200).send())
      .catch(err => {
        console.log("error in get comments", err);
      });
  },

  createComment: (req, res) => {
    const database = req.app.get("db");
    let { comment_id, user_id, comment_body, blogpost_id } = req.body;
    console.log(comment_id, user_id, comment_body, blogpost_id);
    database
      .comment_create([comment_id, user_id, comment_body, blogpost_id])
      .then(() => res.status(200).send())
      .catch(err => {
        console.log("error in create comment", err);
      });
  },

  editComment: (req, res) => {
    const database = req.app.get("db");
    let { user_id, comment_body, blogpost_id } = req.body;
    let { comment_id } = req.params;

    database
      .comment_edit([comment_id, user_id, comment_body, blogpost_id])
      .then(() => res.status(200).send())
      .catch(err => {
        console.log("error in edit comment", err);
      });
  },

  deleteComment: (req, res) => {
    const database = req.app.get("db");
    const { comment_id } = req.params;
    database
      .comment_delete([comment_id])
      .then(() => res.status(200).send())
      .catch(err => {
        console.log("error in delete comment", err);
      });
  }
};
