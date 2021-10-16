import React, { useState, useEffect, FC } from "react";

import { IssueComments } from "../IssueDetails/types";
import { withData } from "./withData";
import useDidUpdateEffect from "../customHooks/didUpdateEffect";
import GithubApolloService from "../../services/githubApolloService";

interface withInitialCommentsProps {
  issueId: string;
  service: { githubApi: GithubApolloService };
}

interface initialCommentsState {
  issueText: string;
  comments: IssueComments[];
  listFetching: boolean;
  totalCount: number;
}

interface IssueDetailsComponent
  extends initialCommentsState,
    withInitialCommentsProps {
  onPostComment: CallableFunction;
}

const withInitialComments = (Wrapped: FC<IssueDetailsComponent>) =>
  withData((props: withInitialCommentsProps) => {
    const {
      issueId,
      service: { githubApi },
    } = props;
    const [state, setState] = useState<initialCommentsState>({
      issueText: "",
      comments: [],
      listFetching: false,
      totalCount: 1000,
    });

    const loadData = () => {
      setState({ ...state, listFetching: true });
      githubApi.getComments(issueId).then(({ data }: { data: any }) => {
        setState({
          issueText: data.node.body,
          comments: data.node.comments.edges,
          listFetching: false,
          totalCount: data.node.comments.totalCount,
        });
      });
    };

    useEffect(() => {
      issueId && loadData();
    }, []);

    useDidUpdateEffect(() => {
      loadData();
    }, [issueId]);

    const onNewComment = (comment: IssueComments) => {
      setState({ ...state, comments: [comment, ...state.comments] });
    };

    return (
      <Wrapped
        {...props}
        onPostComment={onNewComment}
        comments={state.comments}
        issueText={state.issueText}
        listFetching={state.listFetching}
        totalCount={state.totalCount}
      />
    );
  });

export default withInitialComments;
export type { IssueDetailsComponent, initialCommentsState };
