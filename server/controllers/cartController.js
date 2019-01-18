module.exports = {
  getCart: (req, res) => {
    if (req.session.cart == undefined && req.session.total == undefined) {
      req.session.cart = [];
      req.session.total = 0;
      res.json(req.session);
    } else {
      res.json(req.session);
    }
  },

  addToCart: (req, res) => {
    let { product } = req.body;

    req.session.cart.push(product);
    req.session.total += parseFloat(product.price);
    res.json(req.session);
  },

  removeFromCart: (req, res) => {
    let { id } = req.params;
    let index = req.session.cart.findIndex(item => item.id == id);
    req.session.total -= parseFloat(req.session.cart[index].price);
    index !== -1
      ? req.session.cart.splice(index, 1)
      : res.send("Item not in cart");
    res.json(req.session);
  }
};
