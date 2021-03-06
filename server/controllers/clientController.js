const nodemailer = require("nodemailer");

module.exports = {
  sendNewsLetter(req, res) {
    const database = req.app.get("db");
    const { email } = req.body;
    database.newsletter_request([email]).then(() => res.status(200).send());

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: `"Carry On" <${process.env.EMAIL}`,
      to: String(email),
      subject: `Thanks for Visiting Carry On!`,
      html: `<h3>Hello! Thank you for visiting Carry On!</h3>
      <p>We hope that you will use our social platform to share your travel experiences with the world. Be sure to come back and visit :)</p>
      <h3>Check Us Out on Our Social Media Pages <a href='www.twitter.com'>Twitter</a> </h3>
      Also, Check out our <a href='  https://www.carryontravel.us/shop'>Store!</a> 
      https://www.carryontravel.us/`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log("------------ Send email error", error);
      } else {
        return console.log("Email sent" + info.response);
      }
    });
  }
};
