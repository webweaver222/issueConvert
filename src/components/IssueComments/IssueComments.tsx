import React, { RefObject } from "react";
import { IssueComments as IssueCommentsType } from "../IssueDetails/types";
import "./IssueComments.scss";

const IssueComments = ({
  comments,
  moreComments,
  wrapper,
  list,
}: {
  comments?: IssueCommentsType[];
  moreComments?: IssueCommentsType[];
  wrapper?: RefObject<HTMLDivElement>;
  list?: RefObject<HTMLDivElement>;
}) => {
  return (
    <div className="IssueCommentsWrapper fancyScrollBar" ref={wrapper}>
      <div className="IssueCommentsList" ref={list}>
        {comments &&
          comments.map((comment) => (
            <div className="IssueComment" key={comment.node.id}>
              {comment.node.body}
            </div>
          ))}
        {moreComments &&
          moreComments.map((comment) => (
            <div className="IssueComment" key={comment.node.id}>
              {comment.node.body}
            </div>
          ))}
      </div>
    </div>
  );
};

export default IssueComments;
