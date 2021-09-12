import { combineReducers } from "redux";
import { media } from "./media";
import { quest } from "./quest";
import { ui } from "./ui";

const rootReducer = combineReducers({
  media,
  quest,
  ui,
});

export default rootReducer;
