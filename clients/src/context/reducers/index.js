import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import userReducer from "./userReducers";

const myReducers = combineReducers({
  user: userReducer,
  alert: alertReducer,
});
export default myReducers;
