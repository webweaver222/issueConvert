import React, { useState } from "react";
import Main from "../Main";
import BGC from "./background";
import { ServiceProvider } from "../elements/service-provider";
import GithubApolloService from "../../services/githubApolloService";
import TestifyApi from "../../services/testifyApi";

import "resources/reset.scss";
import "resources/main.scss";

import Auth from "../Auth";

const testifyApi = new TestifyApi();
const githubApi = new GithubApolloService();

const App = () => {
  const [client, setClient] = useState<GithubApolloService>(githubApi);

  const Authnticate = (token?: string) =>
    setClient(new GithubApolloService(token));

  return (
    <div className="app">
      <ServiceProvider value={client}>
        <Main />
      </ServiceProvider>
      <Auth Authnticate={Authnticate} testifyApi={testifyApi} />
      <BGC />
    </div>
  );
};

export default App;
