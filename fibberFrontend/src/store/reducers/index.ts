import { combineReducers } from "redux";
import { settings } from "./settings";
import { quest } from "./quest";

const rootReducer = combineReducers({
  settings,
  quest,
});

export default rootReducer;
