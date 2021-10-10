import React from "react";
import ReactDom from "react-dom";

import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import App from "./components/app";
import sprite from "../src/resources/svg/sprite.svg";

const history = createBrowserHistory({ basename: "issues" });

ReactDom.render(
  <Router history={history}>
    <div
      dangerouslySetInnerHTML={{ __html: sprite }}
      style={{ display: "none" }}
    ></div>
    <App />
  </Router>,
  document.getElementById("root")
);
