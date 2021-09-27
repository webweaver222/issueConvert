import React from "react";
import { IssuesItem } from "../../IssuesCabinet/types";
import { dateFormat } from "../../../utils";

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
    <div className="IssueCardWrapper" onClick={() => onIssueClick(id)}>
      <div className="card IssueCard">
        <div className="cardHeader">
          <img src={avatarUrl} alt="userAvatar.png" />
          <span className="cardLogin">{login}</span>
          <div
            className="issueStatus"
            style={state === "OPEN" ? {} : { color: "red" }}
          >
            <svg className="checkbox">
              {
                <use
                  xlinkHref={state === "OPEN" ? "#checkbox" : "#status"}
                ></use>
              }
            </svg>
            <span>{state}</span>
          </div>
        </div>
        <div className="cardBody">
          <div className="icon-wrapper">
            <svg className="brain">
              <use xlinkHref="#brain"></use>
            </svg>
          </div>

          <span>{title}</span>
        </div>
        <div className="cardFooter">
          <div className="issueDate">
            <svg className="calendar">
              <use xlinkHref="#calendar"></use>
            </svg>
            <span>{dateFormat(createdAt)}</span>
          </div>
          <div className="issueComments">
            <svg className="comments">
              <use xlinkHref="#comments"></use>
            </svg>
            <span>{totalCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
