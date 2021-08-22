import React, { useEffect, useState } from "react";
import GithubApolloService from "../../services/githubApolloService";
import { IssuesData } from "../IssuesCabinet/types";
import { withData } from "../hoc/withData";
import useDidUpdateEffect from "../customHooks/didUpdateEffect";
import "./IssueDetails.scss";

import { IssueDetailsData } from "./types";

const IssueDetails = ({
  currentIssueId,
  service: {
    data: {
      issues: { edges: initialData },
    },
    githubApi,
  },
}: {
  currentIssueId: string;
  service: {
    data: IssuesData;
    githubApi: GithubApolloService;
  };
}) => {
  const [data, setData] = useState<IssueDetailsData | null>(null);

  useEffect(() => {
    githubApi.getComments(initialData[0].node.id).then(({ data }) => {
      setData(data);
    });
  }, []);

  useDidUpdateEffect(() => {
    githubApi.getComments(currentIssueId).then(({ data }) => {
      setData(data);
    });
  }, [currentIssueId]);

  return (
    <div className="IssueDetailsWrapper">
      {
        <p className="IssueText">{data?.node.body}</p>
        /* <IssueComments/> //withInfiniteScroll
         * <CommentInput />
         *
         *
         *
         */
      }
    </div>
  );
};

export default withData(IssueDetails);
0;
