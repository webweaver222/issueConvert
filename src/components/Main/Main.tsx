import React, { useState, useEffect, useCallback } from "react";
import GitgubApolloService, {
  ApolloQueryResult,
} from "../../services/githubApolloService";
import { withGithubApi } from "../hoc/withService";
import { compose, debounce } from "../../utils";

import "./Main.scss";

interface MainInterface {
  service: GitgubApolloService;
}

const Main: React.FC<MainInterface> = ({ service }: MainInterface) => {
  const [input, setInput] = useState("");
  const [repoList, setRepoList] = useState([]);

  const debounced = useCallback(
    debounce(service.getRepos, (response: Promise<ApolloQueryResult<any>>) => {
      response.then(
        ({
          data: {
            search: { nodes },
          },
        }) => {
          setRepoList(nodes);
        }
      );
    }),
    [service.getRepos]
  );

  useEffect(() => {
    if (input) {
      debounced(input);
    }

    setRepoList([]);
  }, [input]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setInput(e.target.value);
  };

  return (
    <div className="MainWrapper">
      <div className="main">
        <div className="input-wrapper">
          <label>Pick a repository...</label>
          <input type="text" value={input} onChange={onChangeInput} />
          <ul
            style={{ visibility: repoList.length > 0 ? "visible" : "hidden" }}
          >
            {repoList.length > 0 &&
              repoList.map((node: any, i) => (
                <li key={i}>
                  {" "}
                  <span className="repo">{node.name}</span>{" "}
                  <span className="owner">{node.owner.login}</span>
                </li>
              ))}
          </ul>
        </div>
        <button className="button">Select Repository</button>
      </div>
    </div>
  );
};

export default compose(withGithubApi)(Main);
