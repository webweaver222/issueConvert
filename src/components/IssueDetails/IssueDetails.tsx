import React from "react";
import { withData } from "../hoc/withData";
import "./IssueDetails.scss";

const IssueDetails = ({
  currentIssueId,
  data,
  githubApi,
}: {
  currentIssueId: string;
  data: any;
  githubApi: any;
}) => {
  return (
    <div className="IssueDetailsWrapper">
      {/**<p className="IssueText"> </p>
       * <IssueComments/> //withInfiniteScroll
       * <CommentInput />
       *
       *
       *
       */}
    </div>
  );
};

export default withData(IssueDetails);
0;
