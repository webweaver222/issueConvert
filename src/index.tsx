import React from "react";
import ReactDom from "react-dom";
import { ServiceProvider } from "./components/elements/service-provider";
import GithubApolloService from "./services/githubApolloService";

import App from "./components/app";

const service = new GithubApolloService();

ReactDom.render(
  <ServiceProvider value={service}>
    <App />
  </ServiceProvider>,
  document.getElementById("root")
);
