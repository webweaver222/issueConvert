import React, { FC, useState, useEffect } from "react";
import { IssuesData } from "../components/IssuesCabinet/types";
import GithubApolloService from "../services/githubApolloService";
import { withData } from "../components/hoc/withData";
import useDidUpdateEffect from "../components/customHooks/didUpdateEffect";

import { IssueDetailsData } from "../components/IssueDetails/types";

interface IssueDetailsContainerProps {
  currentIssueId: string;
  service: {
    data: IssuesData;
    githubApi: GithubApolloService;
  };
}

interface IssueDetailsComponent {
  data: IssueDetailsData | null;
  fetching: boolean;
}

const IssueDetailsContainer = (Wrapped: FC<IssueDetailsComponent>) =>
  withData((props: IssueDetailsContainerProps) => {
    const {
      currentIssueId,
      service: {
        data: {
          issues: { edges: initialData },
        },
        githubApi,
      },
    } = props;

    const [data, setData] = useState<IssueDetailsData | null>(null);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
      setFetching(true);
      githubApi.getComments(initialData[0].node.id).then(({ data }) => {
        setData(data);
        setFetching(false);
      });
    }, []);

    useDidUpdateEffect(() => {
      setFetching(true);
      githubApi.getComments(currentIssueId).then(({ data }) => {
        setData(data);
        setFetching(false);
      });
    }, [currentIssueId]);

    const propsToWrapped: IssueDetailsComponent = {
      data,
      fetching,
    };

    return <Wrapped {...propsToWrapped} />;
  });

export default IssueDetailsContainer;
export type { IssueDetailsComponent };
