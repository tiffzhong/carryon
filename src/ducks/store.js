import { createStore, applyMiddleware, combineReducers } from "redux";
import reduxPromiseMiddleware from "redux-promise-middleware";
import blogpostReducer from "../ducks/blogpostReducer";
import shopReducer from "../ducks/shopReducer";

const reducer = combineReducers({
  blogpost: blogpostReducer,
  shop: shopReducer
});

const store = createStore(reducer, applyMiddleware(reduxPromiseMiddleware()));

export default store;
