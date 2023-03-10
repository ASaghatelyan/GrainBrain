import { combineReducers, createStore } from "redux";
import customerReducer from "./customerReducer";
import firebaseTokenReducer from "./firebaseTokenReducer";

const store = createStore(
  combineReducers({
    customer: customerReducer,
    firebaseToken: firebaseTokenReducer,
  }));

export default store;
