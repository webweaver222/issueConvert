import React, { useState, useEffect } from "react";
import GitgubApolloService from "../../services/githubApolloService";
import { withGithubApi } from "../hoc/withService";
import { compose } from "../../utils";

import "./Main.scss";

interface MainInterface {
  service: GitgubApolloService;
}

const Main: React.FC<MainInterface> = ({ service }: MainInterface) => {
  useEffect(() => {
    console.log(service);
  }, [service]);

  const [input, setInput] = useState("");

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setInput(e.target.value);
  };

  return (
    <div className="MainWrapper">
      <div className="main">
        <div className="input-wrapper">
          <label>Pick a repository...</label>
          <input type="text" value={input} onChange={onChangeInput} />
        </div>
        <button className="button">Find</button>
      </div>
    </div>
  );
};

export default compose(withGithubApi)(Main);
