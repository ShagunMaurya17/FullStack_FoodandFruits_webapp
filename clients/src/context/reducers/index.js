import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import productReducer from "./productReducer";
import userReducer from "./userReducers";

const myReducers = combineReducers({
  user: userReducer,
  alert: alertReducer,
  products: productReducer,
});
export default myReducers;
