module.exports = {
  getCart: (req, res) => {
    if (!req.session.cart) {
      req.session.cart = [];
      req.session.total = 0;
      res.json(req.session);
    } else {
      res.json(req.session);
    }
  },

  addToCart: (req, res) => {
    let { product_id, product_name, product_price, quantity, image } = req.body;

    console.log(req.body, "show me bodehhh");

    let newItem = {
      product_id,
      product_name,
      product_price,
      quantity,
      image
    };
    if (!req.session.cart) {
      req.session.total = product_price * quantity;
      req.session.cart = [newItem];
    } else if (
      req.session.cart.find(v => v.product_id === newItem.product_id)
    ) {
      console.log("else if is running");
      let updatedItem = req.session.cart.find(
        f => f.product_id === newItem.product_id
      );
      updatedItem.quantity += newItem.quantity;
      req.session.total += newItem.product_price * newItem.quantity;
      // req.session.total.push(updatedItem);
    } else {
      req.session.cart.push(newItem);
      req.session.total += product_price * quantity;
    }
    // console.log(req.session.cart, "did the cart make");
    console.log(req.session.total, "this is the total");
    // req.session.total += parseFloat(product_price.price);
    res.json(req.session);
  },

  updateCart: (req, res) => {
    let { quantity } = req.body;
    let { product_id } = req.params;
    console.log(req.body, "bodehhhheheheh");

    let updatedItem = req.session.cart.find(f => f.product_id == product_id);
    req.session.total -= updatedItem.product_price * updatedItem.quantity;

    console.log("quant", req.session.total);
    updatedItem.quantity = quantity;
    req.session.total += updatedItem.product_price * updatedItem.quantity;
    console.log("quant2", req.session.total);

    // console.log(req.session.total, "seshshion totale");
    res.json(req.session);
  },

  removeFromCart: (req, res) => {
    let { product_id } = req.params;
    console.log(req.params, "paramemehehehehh");

    let index = req.session.cart.findIndex(
      item => item.product_id == product_id
    );
    console.log(
      req.session.cart[index].quantity * req.session.cart[index].product_price,
      "indexeh"
    );

    req.session.total -=
      req.session.cart[index].quantity * req.session.cart[index].product_price;

    index !== -1
      ? req.session.cart.splice(index, 1)
      : res.send("Item not in cart");

    res.json(req.session);
  }
};
