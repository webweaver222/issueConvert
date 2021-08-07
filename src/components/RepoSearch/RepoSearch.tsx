import React from "react";
import RepoSearchContainer, {
  SelectedRepo,
} from "../../containers/RepoSearchContainer";

import "./RepoSearch.scss";

interface RepoSearchComponent {
  input: string;
  repoList: object[]; // comes from api
  selectedRepo: SelectedRepo;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRepoClick: (id: string, title: string) => void;
  onDeleteClick: () => void;
}

const RepoSearch = ({
  input,
  repoList,
  selectedRepo,
  onChangeInput,
  onRepoClick,
  onDeleteClick,
}: RepoSearchComponent) => (
  <div className="RepoSearchWrapper">
    {" "}
    <div className="main">
      <div className="input-wrapper">
        <label>Pick a repository...</label>
        <div className="selectedInput">
          <input
            type="text"
            value={selectedRepo.id ? selectedRepo.title : input}
            onChange={!selectedRepo.id ? onChangeInput : () => {}}
          />
          <i
            className="fas fa-times"
            onClick={onDeleteClick}
            style={{ visibility: selectedRepo.id ? "visible" : "hidden" }}
          ></i>
        </div>
        <ul style={{ visibility: repoList.length > 0 ? "visible" : "hidden" }}>
          {repoList.length > 0 &&
            repoList.map((node: any, i: number) => (
              <li
                key={i}
                onClick={() => onRepoClick(node.id, node.nameWithOwner)}
              >
                <span className="repo">{node.name}</span>{" "}
                <span className="owner">{node.owner.login}</span>
              </li>
            ))}
        </ul>
        <button
          className="button"
          style={{ display: selectedRepo.id ? "inline-block" : "none" }}
        >
          Select Repository
        </button>
      </div>
    </div>
  </div>
);

export default RepoSearchContainer(RepoSearch);
export type { RepoSearchComponent };
