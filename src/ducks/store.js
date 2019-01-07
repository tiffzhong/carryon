import { createStore, applyMiddleware } from "redux";
import reduxPromiseMiddleware from "redux-promise-middleware";
import blogpostReducer from "../ducks/blogpostReducer";

export default createStore(
  blogpostReducer,
  applyMiddleware(reduxPromiseMiddleware())
);
