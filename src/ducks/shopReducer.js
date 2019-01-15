import axios from "axios";

const INITIAL_STATE = {
  products: [],
  shoppingCart: [],
  total: 0
};

const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
const CREATE_PRODUCT = "CREATE_PRODUCT";
const EDIT_PRODUCT = "EDIT_PRODUCT";

const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_SHOPPING_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_SHOPPING_CART";

export default function shopReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ...state, products: action.payload };
    case CREATE_PRODUCT:
      return { ...state };
    case EDIT_PRODUCT:
      return { ...state };
    case GET_CART:
      return {
        ...state,
        shoppingCart: action.payload.cart,
        total: action.payload.total
      };
    case ADD_TO_CART:
      return {
        ...state,
        shoppingCart: action.payload.cart,
        total: action.payload.total
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        shoppingCart: action.payload.cart,
        total: action.payload.total
      };
    default:
      return { ...state };
  }
}

export function getProducts() {
  return {
    type: GET_ALL_PRODUCTS,
    payload: axios
      .get("/api/products")
      .then(response => {
        return response.data;
      })
      .catch(err => console.log("Err in getProducts", err))
  };
}
// export function createProduct(
//   name,
//   price,
//   image,
//   description,
//   quantity,
//   admin_id
// ) {
//   return {
//     type: CREATE_PRODUCT,
//     payload: axios
//       .post("/api/products", {
//         name,
//         price,
//         image,
//         description,
//         quantity,
//         admin_id
//       })
//       .then(res => (window.location.pathname = "/shop"))
//       .catch(err => console.log("Err in createProduct", err))
//   };
// }
// export function editProduct(name, price, image, description, quantity) {
//   console.log(name, price, description, quantity);
//   return {
//     type: EDIT_PRODUCT,
//     payload: axios
//       .put(`/api/products/${product_id}`, {
//         name,
//         price,
//         image,
//         description,
//         quantity
//       })
//       .then(res => (window.location.pathname = "/products"))
//       .catch(err => console.log("Err in edit product", err))
//   };
// }
// export function setCart() {
//   return {
//     type: SET_CART,
//     payload: axios
//       .get("/api/user/cart")
//       .then(res => res.data)
//       .catch(err => console.log("Err in set cart", err))
//   };
// }
// export function addToCart(product) {
//   return {
//     type: ADD_TO_CART,
//     payload: axios
//       .post("/api/user/cart", { product })
//       .then(res => res.data)
//       .catch(err => console.log("Err in addToCart", err))
//   };
// }
// export function removeFromCart(id) {
//   return {
//     type: REMOVE_FROM_CART,
//     payload: axios
//       .delete(`/api/user/cart/${id}`)
//       .then(res => res.data)
//       .catch(err => console.log("Err in removeFromCart", err))
//   };
// }
