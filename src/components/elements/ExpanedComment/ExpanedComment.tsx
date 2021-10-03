import React from "react";

import { IssueComments } from "../../IssueDetails/types";
import "./ExpanedComment.scss";

const ExpanedComment = ({ comment }: { comment: IssueComments }) => {
  return (
    <div className="ExpanedCommentWrapper fancyScrollBar">
      {comment.node.body}
    </div>
  );
};

export default ExpanedComment;
