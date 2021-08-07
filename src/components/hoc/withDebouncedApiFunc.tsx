import React, { useCallback, FC } from "react";
import GitgubApolloService, {
  ApolloQueryResult,
} from "../../services/githubApolloService";
import { compose, debounce } from "../../utils";

const withDebouncedApiFunc =
  (Wrapped: FC) =>
  ({
    service: githubApi,
    setRepoList,
  }: {
    service: GitgubApolloService;
    setRepoList: React.Dispatch<React.SetStateAction<never[]>>;
  }) => {
    const debounced = useCallback(
      debounce(
        githubApi.getRepos,
        (response: Promise<ApolloQueryResult<any>>) => {
          response.then(
            ({
              data: {
                search: { nodes },
              },
            }) => {
              setRepoList(nodes);
            }
          );
        }
      ),
      [githubApi.getRepos]
    );

    return <Wrapped />;
  };
