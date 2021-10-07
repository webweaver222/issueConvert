import React, { useState, useRef, RefObject } from "react";
import Main from "../Main";
import BGC from "./background";
import { ServiceProvider } from "../elements/service-provider";
import GithubApolloService from "../../services/githubApolloService";
import AuthApi from "../../services/authApi";

import "resources/reset.scss";
import "resources/main.scss";

import Auth from "../Auth";

const authApi = new AuthApi();
const githubApi = new GithubApolloService();

const App = () => {
  const [client, setClient] = useState<GithubApolloService>(githubApi);
  const authBtn = useRef<HTMLButtonElement>(null);

  const Authnticate = (token?: string) =>
    setClient(new GithubApolloService(token));

  return (
    <div className="app">
      <ServiceProvider value={client}>
        <Main onAuth={() => authBtn.current?.click()} />
      </ServiceProvider>
      <Auth aref={authBtn} Authnticate={Authnticate} authApi={authApi} />
      <BGC />
    </div>
  );
};

export default App;
