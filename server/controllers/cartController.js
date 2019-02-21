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
      let updatedItem = req.session.cart.find(
        f => f.product_id === newItem.product_id
      );
      updatedItem.quantity += newItem.quantity;
      req.session.total += newItem.product_price * newItem.quantity;
    } else {
      req.session.cart.push(newItem);
      req.session.total += product_price * quantity;
    }
    res.json(req.session);
  },

  updateCart: (req, res) => {
    let { quantity } = req.body;
    let { product_id } = req.params;
    let updatedItem = req.session.cart.find(f => f.product_id == product_id);
    req.session.total -= updatedItem.product_price * updatedItem.quantity;
    updatedItem.quantity = quantity;
    req.session.total += updatedItem.product_price * updatedItem.quantity;
    res.json(req.session);
  },

  removeFromCart: (req, res) => {
    let { product_id } = req.params;
    let index = req.session.cart.findIndex(
      item => item.product_id == product_id
    );

    req.session.total -=
      req.session.cart[index].quantity * req.session.cart[index].product_price;

    index !== -1
      ? req.session.cart.splice(index, 1)
      : res.send("Item not in cart");

    res.json(req.session);
  }
};
