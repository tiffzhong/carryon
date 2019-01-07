const ABdata = require("../ABquote.json");

module.exports = {
  readQuotes: (req, res) => {
    const { id } = req.params;
    res.status(200).send(ABdata[id]);
  }
};
