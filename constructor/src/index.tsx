import "antd/dist/antd.less";
import "assets/sass/index.sass";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Router from "router/router";
import { store } from "store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);
