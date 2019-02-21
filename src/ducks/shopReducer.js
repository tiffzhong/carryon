import axios from "axios";

const INITIAL_STATE = {
  products: [],
  product: [],
  total: 0,
  cart: []
};

const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
const GET_PRODUCT = "GET_PRODUCT";
// const CREATE_PRODUCT = "CREATE_PRODUCT";
// const DELETE_PRODUCT = "DELETE_PRODUCT";
// const EDIT_PRODUCT = "EDIT_PRODUCT";

const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_SHOPPING_CART";
const UPDATE_CART = "UPDATE_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_SHOPPING_CART";

export default function shopReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${GET_ALL_PRODUCTS}_FULFILLED`:
      return { ...state, products: action.payload };
    case `${GET_PRODUCT}_FULFILLED`:
      return { ...state, product: action.payload };
    // case `${CREATE_PRODUCT}_FULFILLED`:
    //   return { ...state };
    // case `${DELETE_PRODUCT}_FULFILLED`:
    //   return { ...state };
    // case `${EDIT_PRODUCT}_FULFILLED`:
    //   return { ...state };

    case `${GET_CART}_FULFILLED`:
      return {
        ...state,
        cart: action.payload.cart,
        total: action.payload.total
      };

    case `${ADD_TO_CART}_FULFILLED`:
      return {
        ...state
      };

    case `${UPDATE_CART}_FULFILLED`:
      return { ...state };

    case `${REMOVE_FROM_CART}_FULFILLED`:
      return { ...state };
    default:
      return { ...state };
  }
}

export function getAllProducts() {
  return {
    type: GET_ALL_PRODUCTS,
    payload: axios
      .get("/api/products")
      .then(response => {
        return response.data;
      })
      .catch(err => console.log("Err in getAllProducts", err))
  };
}

export function getOneProduct(product_id) {
  return {
    type: GET_PRODUCT,
    payload: product_id
  };
}

// export function createProduct(
//   product_id,
//   product_name,
//   product_description,
//   product_price,
//   product_picture,
//   product_quantity
// ) {
//   return {
//     type: CREATE_PRODUCT,
//     payload: axios
//       .post("/api/product", {
//         product_id,
//         product_name,
//         product_description,
//         product_price,
//         product_picture,
//         product_quantity
//       })
//       .then(() => {
//         window.location.pathname = "/shop";
//       })
//       .catch(error => console.log("error in createproduct", error))
//   };
// }

// export function deleteProduct(product_id) {
//   return {
//     type: DELETE_PRODUCT,
//     payload: axios
//       .delete(`/api/product/${product_id}`)
//       .then(() => (window.location.pathname = "/shop"))
//       .catch(error => console.log("error in deleteing product", error))
//   };
// }

// export function editProduct(
//   product_id,
//   product_name,
//   product_description,
//   product_price,
//   product_picture,
//   product_quantity
// ) {
//   return {
//     type: EDIT_PRODUCT,
//     payload: axios
//       .put(`/api/product/${product_id}`, {
//         product_id,
//         product_name,
//         product_description,
//         product_price,
//         product_picture,
//         product_quantity
//       })
//       .then(() => (window.location.pathname = "/shop"))
//       .catch(error => console.log("error in editing product", error))
//   };
// }

export function getCart() {
  // console.log("get cart is running from cart component");
  return {
    type: GET_CART,
    payload: axios
      .get("/api/user/cart")
      .then(res => res.data)
      .catch(err => console.log("Err in set cart", err))
  };
}

export function addToCart(
  product_id,
  product_name,
  product_price,
  quantity,
  image,
  total
) {
  // console.log(
  //   "all the paarrams",
  //   product_id,
  //   product_name,
  //   product_price,
  //   quantity,
  //   image,
  //   total
  // );
  return {
    type: ADD_TO_CART,
    payload: axios
      .post("/api/user/cart", {
        product_id,
        product_name,
        product_price,
        quantity,
        image,
        total
      })
      .then(res => res.data.total)
      .catch(err => console.log("Err in addToCart", err))
  };
}
export function updateCart(product_id, quantity) {
  // console.log("quantity", quantity);
  return {
    type: UPDATE_CART,
    payload: axios
      .put(`/api/user/cart/${product_id}`, { quantity })
      .then(res => res.data.total)
      .then((window.location.pathname = "/shoppingcart"))
      .catch(error => console.log(error, "error in updatecart"))
  };
}
export function removeFromCart(product_id) {
  return {
    type: REMOVE_FROM_CART,
    payload: axios
      .delete(`/api/user/cart/${product_id}`)
      .then(res => res.data)
      .then((window.location.pathname = "/shoppingcart"))
      .catch(err => console.log("Err in removeFromCart", err))
  };
}
