import React, { useState, useCallback, FC } from "react";
import didUpdateEffect from "../customHooks/didUpdateEffect";
import { ApolloQueryResult } from "../../services/githubApolloService";
import { RepoSearchComponent } from "../../containers/RepoSearchContainer";
import { debounce } from "../../utils";

const withDataFetch =
  (Wrapped: FC<RepoSearchComponent>) => (props: RepoSearchComponent) => {
    //destr some props that we need in here
    const { input, githubApi, setRepoList } = props;

    const [fetching, setFetching] = useState(false);

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

    return <Wrapped {...props} fetching={fetching} />;
  };

export default withDataFetch;
