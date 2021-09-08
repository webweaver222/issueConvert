import React, { useState, useEffect, FC } from "react";

import { IssueComments } from "../IssueDetails/types";
import { withData } from "./withData";
import useDidUpdateEffect from "../customHooks/didUpdateEffect";
import GithubApolloService from "../../services/githubApolloService";

interface withInitialCommentsProps {
  currentIssueId: string;
  service: { githubApi: GithubApolloService };
}

interface initialCommentsState {
  issueText: string;
  comments: IssueComments[];
  listFetching: boolean;
}

interface withInitialCommentsHoc extends withInitialCommentsProps {}

interface withInitialCommentsHoc extends initialCommentsState {}

const withInitialComments = (Wrapped: FC<withInitialCommentsHoc>) =>
  withData((props: withInitialCommentsProps) => {
    const {
      currentIssueId,
      service: { githubApi },
    } = props;
    const [state, setState] = useState<initialCommentsState>({
      issueText: "",
      comments: [],
      listFetching: false,
    });
    console.log(currentIssueId);
    const loadData = () => {
      setState({ ...state, listFetching: true });
      githubApi.getComments(currentIssueId).then(({ data }: { data: any }) => {
        setState({
          issueText: data.node.body,
          comments: data.node.comments.edges,
          listFetching: false,
        });
      });
    };

    useEffect(() => {
      loadData();
    }, []);

    useDidUpdateEffect(() => {
      loadData();
    }, [currentIssueId]);

    return (
      <Wrapped
        {...props}
        comments={state.comments}
        issueText={state.issueText}
        listFetching={state.listFetching}
      />
    );
  });

export default withInitialComments;
export type {
  withInitialCommentsProps,
  withInitialCommentsHoc,
  initialCommentsState,
};
