import React from "react";
import RepoSearchContainer, {
  RepoSearchComponent,
} from "../../containers/RepoSearchContainer";
import FetchStatus from "../elements/fetchStatus";
import withDataFetch from "../hoc/withDataFetch";
import { compose } from "../../utils";

import "./RepoSearch.scss";

const RepoSearch = ({
  input,
  repoList,
  selectedRepo,
  fetching,
  onChangeInput,
  onRepoClick,
  onDeleteClick,
}: RepoSearchComponent) => {
  console.log(repoList);
  return (
    <div className="RepoSearchWrapper">
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
          <ul
            style={{
              visibility:
                repoList.length > 0 || fetching ? "visible" : "hidden",
            }}
          >
            <FetchStatus
              fetching={fetching}
              render={() => (
                <>
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
                </>
              )}
            />
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
};

export default compose(RepoSearchContainer, withDataFetch)(RepoSearch);
export type { RepoSearchComponent };
