import React, { useState } from "react";
import Main from "../Main";
import BGC from "./background";
import { ServiceProvider } from "../elements/service-provider";
import GithubApolloService from "../../services/githubApolloService";

import "resources/reset.scss";
import "resources/main.scss";

import Auth from "../Auth";

//const clientApi = new GithubApolloService();

const App = () => {
  const [api, setApi] = useState<GithubApolloService>(
    new GithubApolloService()
  );

  const Authnticate = (token?: string) =>
    setApi(new GithubApolloService(token));

  return (
    <div className="app">
      <ServiceProvider value={api}>
        <Main />
      </ServiceProvider>
      <Auth Authnticate={Authnticate} />
      <BGC />
    </div>
  );
};

export default App;
