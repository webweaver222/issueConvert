import React, { useState, useCallback, FC } from "react";
import didUpdateEffect from "../customHooks/didUpdateEffect";
import { ApolloQueryResult } from "../../services/githubApolloService";
import { RepoSearchComponent } from "../../containers/RepoSearchContainer";
import { debounce } from "../../utils";

const withDataFetch =
  (Wrapped: FC<RepoSearchComponent>) => (props: RepoSearchComponent) => {
    //destr some props that we need in here
    const { input, githubApi, setRepoList, setIssues } = props;

    const [fetching, setFetching] = useState(false);
    const [status, setStatus] = useState("");

    //To propeply get data from api:
    // 1. Debouncing the api function
    // 2. Providing callback function to aquire the response
    // 3. Using useCallback hook to prevent creating new contexts
    const debounced = useCallback(
      debounce(
        githubApi.getRepos,
        (response: Promise<ApolloQueryResult<any>>) => {
          response
            .then(
              ({
                data: {
                  search: { nodes },
                },
              }) => {
                setFetching(false);
                setRepoList(nodes);
              }
            )
            .catch((e) => {
              setFetching(false);
              setStatus(e.message);
            });
        }
      ),
      [githubApi.getRepos]
    );

    //Fetch on input update
    didUpdateEffect(() => {
      if (input && !fetching) setFetching(true);
      debounced(input);
      if (!input) {
        setFetching(false);
        setRepoList([]);
      }
    }, [input]);

    const onSelectRepo = (id: string) => {
      console.log(typeof id);
      githubApi
        .getIssues(id)
        .then(({ data }) => setIssues!(data.node))
        .catch((e) => console.log(e));
    };

    return (
      <Wrapped
        {...props}
        fetching={fetching}
        status={status}
        onSelectRepo={onSelectRepo}
      />
    );
  };

export default withDataFetch;
