import React, { useState } from "react";
import RepoSearch from "../RepoSearch";
import FetchStatus from "../elements/fetchStatus";
import { withGithubApi } from "../hoc/withService";

import GitgubApolloService from "../../services/githubApolloService";
import "./Main.scss";

const Main = ({ service: githubApi }: { service: GitgubApolloService }) => {
  const [issues, setIssues] = useState<Object | null>(null);
  const [fetching, setFetching] = useState(false);
  const [status, setStatus] = useState("");

  const fetchRepo = (id: string) => {
    setFetching(true);

    githubApi
      .getIssues(id)
      .then(({ data }) => {
        setFetching(false);
        setIssues!(data.node);
      })
      .catch((e) => {
        setFetching(false);
        setStatus(e.message);
      });
  };

  return (
    <div className="MainWrapper">
      {!issues && !fetching && !status && (
        <RepoSearch onFetchRepo={fetchRepo} />
      )}

      {(issues || status || fetching) && (
        <FetchStatus
          render={() => <> 1</>}
          fetching={fetching}
          status={status}
          onReset={() => setStatus("")}
        />
      )}
    </div>
  );
};

export default withGithubApi(Main);
