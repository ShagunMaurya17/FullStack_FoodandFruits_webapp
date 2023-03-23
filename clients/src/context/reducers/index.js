import { combineReducers } from "redux";
import userReducer from "./userReducers";

const myReducers = combineReducers({
  user: userReducer,
});
export default myReducers;
