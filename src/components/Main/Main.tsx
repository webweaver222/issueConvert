import React, { useState, useEffect } from "react";
import RepoSearch from "../RepoSearch";
import IssuesCabinet from "../IssuesCabinet";
import FetchStatus from "../elements/fetchStatus";
import { withData as withGithubApi } from "../hoc/withData";
import { ServiceProvider } from "../elements/service-provider";

import GitgubApolloService from "../../services/githubApolloService";
import "./Main.scss";

import json from "../../../try.json";

const Main = ({ service: githubApi }: { service: GitgubApolloService }) => {
  const [data, setData] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [status, setStatus] = useState("");

  console.log(data);

  useEffect(() => {
    setFetching(true);

    githubApi
      .getIssues("MDEwOlJlcG9zaXRvcnkyNTQyNzgxNw==")
      .then(({ data }) => {
        setFetching(false);
        setData(data.node);
      })
      .catch((e) => {
        setFetching(false);
        setStatus(e.message);
      });

    //setData(json.data.node);
  }, []);

  const fetchRepo = (id: string) => {
    setFetching(true);

    githubApi
      .getIssues(id)
      .then(({ data }) => {
        setFetching(false);
        setData(data.node);
      })
      .catch((e) => {
        setFetching(false);
        setStatus(e.message);
      });
  };

  return (
    <div className="MainWrapper">
      {!data && !fetching && !status && (
        <>
          <RepoSearch onFetchRepo={fetchRepo} />
        </>
      )}

      {(data || status || fetching) && (
        <FetchStatus
          render={() => (
            <ServiceProvider value={{ data, githubApi }}>
              <IssuesCabinet />
            </ServiceProvider>
          )}
          fetching={fetching}
          status={status}
          onReset={() => setStatus("")}
        />
      )}
    </div>
  );
};

export default withGithubApi(Main);
