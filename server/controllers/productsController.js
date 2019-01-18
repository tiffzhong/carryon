module.exports = {
  getAllProducts: (req, res) => {
    const database = req.app.get("db");
    database
      .products_get_all()
      .then(products => {
        res.status(200).send(products);
      })
      .catch(error => {
        res.status(500).send({
          errorMessage: "something wrong w getting all products"
        });
        console.log(error);
      });
  },

  getOneProduct: (req, res) => {
    const database = req.app.get("db");
    let { product_id } = req.params;
    database
      .product_get_one(product_id)
      .then(product => {
        res.status(200).send(product[0]);
      })
      .catch(err => {
        console.log("error in get getting ONE product", err);
      });
  },

  createProduct: (req, res) => {
    const database = req.app.get("db");
    console.log(req.body, `-------------------`);
    let {
      product_id,
      product_name,
      product_description,
      product_price,
      product_picture,
      product_quantity
    } = req.body;
    database
      .product_create([
        product_id,
        product_name,
        product_description,
        product_price,
        `{${product_picture}}`,
        product_quantity
      ])
      .then(() => res.status(200).send())
      .catch(err => {
        console.log("error in create product", err);
      });
  },

  updateProduct: (req, res) => {
    const database = req.app.get("db");
    let {
      product_name,
      product_description,
      product_price,
      product_picture,
      product_quantity
    } = req.body;
    let { product_id } = req.params;
    console.log(
      product_name,
      product_description,
      product_price,
      product_picture,
      product_quantity,
      product_id,
      "@@@@@@@@"
    );

    database
      .product_update([
        product_name,
        product_description,
        product_price,
        `{${product_picture}}`,
        product_quantity,
        product_id
      ])
      .then(() => res.status(200).send())
      .catch(error => console.log("Error in updating product", error));
  },

  deleteProduct: (req, res) => {
    const database = req.app.get("db");
    let { product_id } = req.params;
    database.product_delete([product_id]).then(() => res.status(200).send());
  }
};
