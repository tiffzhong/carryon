let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const charge = stripe.charges.create({
//   amount:
// })
module.exports = {
  payment: async (req, res) => {
    const { token, amount } = req.body;
    stripe.charges.create(
      { source: token.id, amount, currency: "usd", description: "hello" },
      (error, response) => {
        error
          ? res.status(500).send({ error })
          : res.status(200).send({ response });
      }
    );

    // let { token, amount } = req.body;
    // let { email, id } = token;

    // try {
    //   let { status } = await stripe.customers
    //     .create({
    //       email,
    //       source: id
    //     })
    //     .then(customer =>
    //       stripe.charges.create({
    //         amount: amount.toFixed(0),
    //         description: "Sample Charge",
    //         currency: "usd",
    //         customer: customer.id
    //       })
    //     )
    //     .then(charge => {
    //       req.session.cart = [];
    //       req.session.total = 0;
    //       res.send(charge);
    //     })
    //     .catch(err => console.log("Err in create charge", err));
    // } catch (err) {
    //   res.status(500).end();
  }
};
