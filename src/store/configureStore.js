import { createStore } from "redux";
import rootReducer from "../reducers";

/**
 * Create the store from root reducer and add any middleware to it
 * @return {object} Returns the store
 */
export default function configureStore() {
  return createStore(rootReducer);
}
