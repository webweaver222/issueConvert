import React from "react";
import ReactDom from "react-dom";

import App from "./components/app";
import sprite from "../src/resources/svg/sprite.svg";

ReactDom.render(
  <>
    <div
      dangerouslySetInnerHTML={{ __html: sprite }}
      style={{ display: "none" }}
    ></div>
    <App />
  </>,
  document.getElementById("root")
);
