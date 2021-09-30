import React, { useState, useEffect } from "react";
import { IssueComments } from "../../IssueDetails/types";
import { dateFormat } from "../../../utils";
import "./CommentCard.scss";

const CommentCard = ({
  comment,
  onIssueClick,
}: {
  comment: IssueComments;
  onIssueClick: Function;
}) => {
  const {
    node: {
      body,
      author: { login, avatarUrl },
      createdAt,
    },
  } = comment;

  let cardBody: HTMLDivElement;

  const [overflowed, setOver] = useState(false);

  useEffect(() => {
    setOver(cardBody.scrollHeight > cardBody.clientHeight);
  }, []);

  return (
    <div
      className="CommentCardWrapper"
      /*onClick={() => onIssueClick(id)}*/
    >
      <div className="card CommentCard">
        <div className="cardHeader">
          <svg className="calendar">
            <use xlinkHref="#calendar"></use>
          </svg>
          <span>{dateFormat(createdAt)}</span>
        </div>
        <div
          className="cardBody"
          ref={(node) => {
            if (node) cardBody = node;
          }}
        >
          {body}
          <span>{overflowed && "more"}</span>
        </div>
        <div className="cardFooter">
          <img src={avatarUrl} alt="userAvatar.png" />
          <span>{login}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
