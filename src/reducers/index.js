import { combineReducers } from "redux";
import tasks from "./tasks";
import modal from "./modal";
import options from "./options";

export default combineReducers({
  tasks,
  modal,
  options,
});
