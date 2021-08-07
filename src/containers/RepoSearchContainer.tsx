import React, { useState, useCallback, useEffect, FC } from "react";
import GitgubApolloService, {
  ApolloQueryResult,
} from "../services/githubApolloService";
import { withGithubApi } from "../components/hoc/withService";
import { compose, debounce } from "../utils";
import { RepoSearchComponent } from "../components/RepoSearch/RepoSearch";

interface MainInterface {
  service: GitgubApolloService;
}

interface SelectedRepo {
  id: string;
  title: string;
}

const RepoSearchContainer = (Wrapped: FC<any>) =>
  compose(withGithubApi)(({ service: githubApi }: MainInterface) => {
    const [input, setInput] = useState("");
    const [repoList, setRepoList] = useState([]);
    const [selectedRepo, setSelectedRepo] = useState({
      id: "",
      title: "",
    });

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      return setInput(e.target.value);
    };

    const onRepoClick = (id: string, title: string) => {
      setSelectedRepo({
        id,
        title,
      });
      setInput("");
      setRepoList([]);
    };

    const onDeleteClick = () => {
      setSelectedRepo({
        id: "",
        title: "",
      });
    };

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

    useEffect(() => {
      if (input) {
        debounced(input);
      }

      setRepoList([]);
    }, [input]);

    const propsToWrapped: RepoSearchComponent = {
      input,
      repoList,
      selectedRepo,
      onChangeInput,
      onRepoClick,
      onDeleteClick,
    };

    return <Wrapped {...propsToWrapped} />;
  });

export default RepoSearchContainer;

export type { SelectedRepo };
