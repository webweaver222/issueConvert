import React from "react";
import ReactDom from "react-dom";
import { ServiceProvider } from "./components/elements/service-provider";
import GitgubApolloService from "./services/githubApolloService";

import App from "./components/app";

const service = new GitgubApolloService();

ReactDom.render(
  <ServiceProvider value={service}>
    <App />
  </ServiceProvider>,
  document.getElementById("root")
);
