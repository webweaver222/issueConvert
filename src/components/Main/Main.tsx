import React, { useState, useEffect } from "react";
import RepoSearch from "../RepoSearch";
import IssuesCabinet from "../IssuesCabinet";
import FetchStatus from "../elements/fetchStatus";
import { withData as withGithubApi } from "../hoc/withData";
import { ServiceProvider } from "../elements/service-provider";

import GitgubApolloService from "../../services/githubApolloService";
import "./Main.scss";

const Main = ({
  service: githubApi,
  onAuth,
}: {
  service: GitgubApolloService;
  onAuth: CallableFunction;
}) => {
  const [state, setState] = useState<{
    data: any;
    fetching: boolean;
    status: string;
  }>({
    data: null,
    fetching: false,
    status: "",
  });

  const fetchRepo = (id: string) => {
    setState((state) => ({ ...state, fetching: true }));

    githubApi
      .getIssues(id)
      .then(({ data }) => {
        setState((state) => ({ ...state, data: data.node, fetching: false }));
      })
      .catch((e) => {
        setState({ ...state, status: e.message, fetching: false });
      });
  };

  return (
    <div className="MainWrapper">
      {!state.data && !state.fetching && !status && (
        <>
          <RepoSearch onFetchRepo={fetchRepo} />
        </>
      )}

      {(state.data || status || state.fetching) && (
        <FetchStatus
          render={() => (
            <ServiceProvider value={{ data: state.data, githubApi, onAuth }}>
              <IssuesCabinet
                initialData={state.data}
                onReturn={() => setState({ ...state, data: null })}
              />
            </ServiceProvider>
          )}
          fetching={state.fetching}
          status={state.status}
          onReset={() => setState((state) => ({ ...state, status: "" }))}
        />
      )}
    </div>
  );
};

export default withGithubApi(Main);
