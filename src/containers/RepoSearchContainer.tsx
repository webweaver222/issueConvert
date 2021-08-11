import React, { useState, FC } from "react";
import GitgubApolloService from "../services/githubApolloService";
import { withGithubApi } from "../components/hoc/withService";
import { compose } from "../utils";

interface SelectedRepo {
  id: string;
  title: string;
}

interface RepoSearchComponent {
  input: string;
  repoList: object[]; // comes from api
  selectedRepo: SelectedRepo;
  githubApi: GitgubApolloService;
  fetching?: boolean;
  status?: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRepoClick: (id: string, title: string) => void;
  onDeleteClick: () => void;
  setRepoList: React.Dispatch<React.SetStateAction<never[]>>;
  onSelectRepo?: (id: string) => void;
  setIssues?: (data: Object) => void;
}

//Getting api service via hoc with Service Consumer
const RepoSearchContainer = (Wrapped: FC<RepoSearchComponent>) =>
  compose(withGithubApi)(
    ({
      service: githubApi,
      setIssues,
    }: {
      service: GitgubApolloService;
      setIssues: () => void;
    }) => {
      // Component's state
      const [input, setInput] = useState("");
      const [repoList, setRepoList] = useState([]);
      const [selectedRepo, setSelectedRepo] = useState({
        id: "",
        title: "",
      });

      //Component's events
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

      //Props to the next hoc
      const propsToWrapped: RepoSearchComponent = {
        input,
        repoList,
        selectedRepo,
        githubApi,
        onChangeInput,
        onRepoClick,
        onDeleteClick,
        setRepoList,
        setIssues,
      };

      return <Wrapped {...propsToWrapped} />;
    }
  );

export default RepoSearchContainer;

export type { SelectedRepo, RepoSearchComponent };
