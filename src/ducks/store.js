import { createStore } from "redux";
import blogpostReducer from "../ducks/blogpostReducer";

export default createStore(
  blogpostReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
