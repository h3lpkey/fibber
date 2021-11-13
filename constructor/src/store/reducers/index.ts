import { combineReducers } from "redux";
import { game } from "./game";
import { media } from "./media";
import { quest } from "./quest";
import { scene } from "./scene";
import { ui } from "./ui";

const rootReducer = combineReducers({
  game,
  media,
  quest,
  scene,
  ui,
});

export default rootReducer;
