import React from "react";
import ReactDom from "react-dom";
import { ServiceProvider } from "./components/elements/service-provider";
import GithubApolloService from "./services/githubApolloService";

import App from "./components/app";

const api = new GithubApolloService();

ReactDom.render(
  <ServiceProvider value={api}>
    <App />
  </ServiceProvider>,
  document.getElementById("root")
);
