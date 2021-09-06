import React, { useState, useEffect, FC } from "react";

import { IssueComments } from "../IssueDetails/types";
import { withData } from "./withData";
import useDidUpdateEffect from "../customHooks/didUpdateEffect";
import didUpdateEffect from "../customHooks/didUpdateEffect";
import { ApolloQueryResult } from "../../services/githubApolloService";
import { RepoSearchComponent } from "../../containers/RepoSearchContainer";
import { debounceSearch } from "../../utils";

const withInitialComments = (Wrapped: FC<any>) =>
  withData((props: any) => {
    const {
      currentIssueId,
      service: { githubApi },
    } = props;
    const [state, setState] = useState<{
      issueText: string;
      comments: IssueComments[];
      listFetching: boolean;
    }>({
      issueText: "",
      comments: [],
      listFetching: false,
    });

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
