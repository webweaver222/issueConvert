import React from "react";
import { compose } from "../../utils";

import IssueListContainer from "../../containers/IssueListContainer";
import withInfiniteScroll from "../hoc/withInfiniteScroll";
import Spinner from "../elements/spinner";
import { IssuesListComponent } from "../../containers/IssueListContainer";
import "./IssuesList.scss";

const IssuesList = ({
  scrollFetching,
  issues,
  fetchedItems: moreIssues,
  wrapper,
  list,
  onIssueClick,
}: IssuesListComponent) => {
  const spinner = scrollFetching && (
    <div className="loaderIcon">
      <Spinner width="40" height="40" color="#5E9CE2" />
    </div>
  );

  return (
    <div className="IssuesListContainer infiniteScroll">
      <div className="IssuesListWrapper fancyScrollBar" ref={wrapper}>
        <div className="issueList" ref={list}>
          {issues!.map((issue) => (
            <div
              className="issueItem"
              key={issue.node.id}
              onClick={() => onIssueClick(issue.node.id)}
            >
              <h2>{issue.node.title}</h2>
              <p>{issue.node.body}</p>
            </div>
          ))}
          {moreIssues.map((issue) => (
            <div
              className="issueItem"
              key={issue.node.id}
              onClick={() => onIssueClick(issue.node.id)}
            >
              <h2>{issue.node.title}</h2>
              <p>{issue.node.body}</p>
            </div>
          ))}
        </div>
      </div>
      {spinner}
    </div>
  );
};

export default compose(IssueListContainer, withInfiniteScroll)(IssuesList);
