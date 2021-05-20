import thunkMiddleware from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { loadState } from "../utils/common";

const persistedState: any = loadState();

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

store.subscribe(() => {
  try {
    localStorage.setItem("state", JSON.stringify(store.getState()));
  } catch (e) {
    localStorage.clear();
  }
});
