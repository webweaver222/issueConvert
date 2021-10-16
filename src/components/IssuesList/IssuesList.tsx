import React from "react";
import { compose } from "../../utils";

import IssueCard from "../elements/IssueCard";
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
        {issues!.length < 1 && (
          <span className="noIssues">No issues created yet</span>
        )}
        <div className="issueList" ref={list}>
          {issues!.map((issue) => (
            <IssueCard
              issue={issue}
              onIssueClick={onIssueClick}
              key={issue.node.id}
            />
          ))}
          {moreIssues!.map((issue) => (
            <IssueCard
              issue={issue}
              onIssueClick={onIssueClick}
              key={issue.node.id}
            />
          ))}
        </div>
      </div>
      {spinner}
    </div>
  );
};

export default compose(IssueListContainer, withInfiniteScroll)(IssuesList);
