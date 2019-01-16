import axios from "axios";

const INITIAL_STATE = {
  products: [],
  shoppingCart: [],
  total: 0,
  product: []
};

const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
const GET_PRODUCT = "GET_PRODUCT";
const CREATE_PRODUCT = "CREATE_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const EDIT_PRODUCT = "EDIT_PRODUCT";

const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_SHOPPING_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_SHOPPING_CART";

export default function shopReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return { ...state, products: action.payload };
    case GET_PRODUCT:
      return { ...state, product: action.payload };
    case CREATE_PRODUCT:
      return { ...state };
    case DELETE_PRODUCT:
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
    payload: axios
      .get("/api/product/product_id")
      .then(res => {
        return res.data;
      })
      .catch(err => console.log("error in getting 1 product", err))
  };
}

export function createProduct(
  product_id,
  product_name,
  product_price,
  product_picture,
  product_quantity
) {
  return {
    type: CREATE_PRODUCT,
    payload: axios
      .post("/api/product", {
        product_id,
        product_name,
        product_price,
        product_picture,
        product_quantity
      })
      .then(() => {
        window.location.pathname = "/shop";
      })
      .catch(error => console.log("error in createproduct", error))
  };
}

export function deleteProduct(product_id) {
  return {
    type: DELETE_PRODUCT,
    payload: axios
      .delete(`/api/product/${product_id}`)
      .then(() => (window.location.pathname = "/shop"))
      .catch(error => console.log("error in deleteing product", error))
  };
}

export function editProduct(
  product_id,
  product_name,
  product_price,
  product_picture,
  product_quantity
) {
  return {
    type: EDIT_PRODUCT,
    payload: axios
      .put(`/api/product/${product_id}`, {
        product_id,
        product_name,
        product_price,
        product_picture,
        product_quantity
      })
      .then(() => (window.location.pathname = "/shop"))
      .catch(error => console.log("error in editing product", error))
  };
}
