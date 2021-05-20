import React from "react";
import ReactDOM from "react-dom";
import Router from "router/router";
import { Provider } from "react-redux";
import { store } from "./store";
require("dotenv").config();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
