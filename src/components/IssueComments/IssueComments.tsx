import React, { RefObject } from "react";
import { IssueComments as IssueCommentsType } from "../IssueDetails/types";
import Spinner from "../elements/spinner";
import "./IssueComments.scss";

const IssueComments = ({
  comments,
  moreComments,
  wrapper,
  list,
  fetching,
}: {
  comments?: IssueCommentsType[];
  moreComments?: IssueCommentsType[];
  wrapper?: RefObject<HTMLDivElement>;
  list?: RefObject<HTMLDivElement>;
  fetching: boolean;
}) => {
  const spinner = fetching && (
    <div className="lw">
      <Spinner width="40" height="40" color="#5E9CE2" />
    </div>
  );

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

        {spinner}
      </div>
    </div>
  );
};

export default IssueComments;
