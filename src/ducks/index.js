import { combineReducers } from "redux";

// all reducers
import counter from "./counter";
import todos from "./todos";
import products from "./products";
import auth from "./auth";

export default combineReducers({
  counter,
  todos,
  products,
  auth
});
