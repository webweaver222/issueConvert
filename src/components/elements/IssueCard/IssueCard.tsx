import React from "react";
import { IssuesItem } from "../../IssuesCabinet/types";

import "./IssueCard.scss";

const IssueCard = ({
  issue,
  onIssueClick,
}: {
  issue: IssuesItem;
  onIssueClick: Function;
}) => {
  const {
    node: {
      id,
      body,
      title,
      createdAt,
      state,
      author: { avatarUrl, login },
      comments: { totalCount },
    },
  } = issue;

  return (
    <div
      className="IssueCardWrapper"
      key={issue.node.id}
      onClick={() => onIssueClick(id)}
    >
      <div className="card IssueCard">
        <header>
          <img src={avatarUrl} alt="userAvatar.png" />
          <div className="issueStatus">
            <svg className="checkbox">
              <use xlinkHref="#checkbox"></use>
            </svg>
            <span>{state}</span>
          </div>
        </header>
        <main>
          <svg></svg>
          <span>{title}</span>
        </main>
        <footer>
          <div className="issueDate">
            <svg className="calendar">
              <use xlinkHref="#calendar"></use>
            </svg>
            <span>{createdAt}</span>
          </div>
          <div className="issueComments">
            <svg className="comments">
              <use xlinkHref="#comments"></use>
            </svg>
            <span>{totalCount}</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default IssueCard;
