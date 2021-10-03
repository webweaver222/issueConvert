import React, { useState, useEffect } from "react";
import { IssueComments } from "../../IssueDetails/types";
import { dateFormat } from "../../../utils";
import "./CommentCard.scss";
import withModal from "../../hoc/withModal";
import ExpanedComment from "../ExpanedComment";
import { compose } from "../../../utils";

const CommentCard = ({
  comment,
  onOpenModal,
}: {
  comment: IssueComments;
  onOpenModal: () => void;
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

  useEffect(() => setOver(cardBody.scrollHeight > cardBody.clientHeight), []);

  return (
    <div className="CommentCardWrapper" onClick={onOpenModal}>
      <div className="card CommentCard">
        <div className="cardHeader">
          <svg className="calendar">
            <use xlinkHref="#calendar"></use>
          </svg>
          <span>{dateFormat(createdAt)}</span>
        </div>
        <div
          className="cardBody"
          style={overflowed ? { paddingBottom: "20px" } : {}}
          ref={(node) => {
            if (node) cardBody = node;
          }}
        >
          {body}
          {overflowed && (
            <div className="overflowed">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>
        <div className="cardFooter">
          <img src={avatarUrl} alt="userAvatar.png" />
          <span>{login}</span>
        </div>
      </div>
    </div>
  );
};

export default compose(withModal(ExpanedComment))(CommentCard);
