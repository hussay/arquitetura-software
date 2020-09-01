import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import "./@fake-db";

import "./assets/scss/material-kit-react.scss";

// pages for this product
import SystemPage from "./views/SystemPage/SystemPage.js";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/" component={SystemPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
