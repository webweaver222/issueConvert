import React, { RefObject, FC, useState, useMemo, useCallback } from "react";
import { IssuesData } from "../components/IssuesCabinet/types";

import GithubApolloService from "../services/githubApolloService";
import { ApolloQueryResult } from "@apollo/client";

import { withData } from "../components/hoc/withData";
import { IssuesItem } from "../components/IssuesCabinet/types";
import { InfiniteScrollProps } from "../components/hoc/withInfiniteScroll";

import { debounceScroll } from "../utils";

interface IssuesListComponent extends InfiniteScrollProps {
  nameWithOwner?: string;
  issues?: IssuesItem[];
  scrollFetching?: boolean;
  fetchedItems: IssuesItem[];
  onIssueClick: Function;
  wrapper?: RefObject<HTMLDivElement>;
  list?: RefObject<HTMLDivElement>;
}

const IssueListContainer = (Wrapped: FC<IssuesListComponent>) =>
  withData(
    ({
      onIssueClick,
      service: { data, githubApi }, //try to move api to hoc
    }: {
      onIssueClick: Function;
      service: {
        data: IssuesData;
        githubApi: GithubApolloService;
      };
    }) => {
      const {
        id,
        nameWithOwner,

        issues: { edges: issues },
      } = data;

      const [moreIssues, setMoreIssues] = useState<IssuesItem[]>([]);

      const cursor =
        issues.length > 0
          ? useMemo(
              () =>
                moreIssues.length > 0
                  ? moreIssues[moreIssues.length - 1].cursor
                  : issues[issues.length - 1].cursor,
              [moreIssues.length]
            )
          : "";

      const debounced = useCallback(
        debounceScroll(
          githubApi.getIssues,
          (response: Promise<ApolloQueryResult<any>>) => {
            response
              .then(
                ({
                  data: { node: evenMoreIssues },
                }: {
                  data: { node: IssuesData };
                }) => {
                  setMoreIssues((moreIssues) => [
                    ...moreIssues,
                    ...evenMoreIssues.issues.edges,
                  ]);
                }
              )
              .catch((e) => {
                console.log(e);
              });
          }
        ),
        [githubApi.getIssues]
      );

      const allLoaded =
        issues.length + moreIssues.length < data.issues.totalCount
          ? false
          : true;

      const propsToWrapped: IssuesListComponent = {
        nameWithOwner,
        issues,
        fetchedItems: moreIssues,
        lastItemId: cursor,
        entityId: id,
        fetchFunction: debounced,
        onIssueClick: onIssueClick,
        allLoaded,
      };

      return <Wrapped {...propsToWrapped} />;
    }
  );

export default IssueListContainer;
export type { IssuesListComponent };
