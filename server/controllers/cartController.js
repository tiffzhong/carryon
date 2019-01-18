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

    if (req.session.cart) {
      req.session.cart.push(newItem);
      req.session.total += product_price * quantity;
    } else {
      req.session.total = product_price * quantity;
      req.session.cart = [newItem];
    }

    // console.log(req.session.cart, "did the cart make");
    // console.log(req.session.total, "this is the fucking total");

    // req.session.total += parseFloat(product_price.price);
    res.json(req.session);
  },

  removeFromCart: (req, res) => {
    let { product_id } = req.params;
    let index = req.session.cart.findIndex(item => item.id == id);
    req.session.total -= parseFloat(req.session.cart[index].price);
    index !== -1
      ? req.session.cart.splice(index, 1)
      : res.send("Item not in cart");
    res.json(req.session);
  }
};
