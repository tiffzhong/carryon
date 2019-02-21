const dotenv = require("dotenv");
dotenv.config();

const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

module.exports = {
  sendText: (req, res) => {
    client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body
    })
    .then(() => {
      res.send("success");
    })
    .catch(err => {
      console.log(err, "error in twilio");
      res.send(err);
    });
});