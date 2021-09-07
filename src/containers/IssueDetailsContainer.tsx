import React, { FC, useState, useMemo, useCallback, RefObject } from "react";
import { InfiniteScrollProps } from "../components/hoc/withInfiniteScroll";
import { ApolloQueryResult } from "@apollo/client";
import {
  IssueDetailsData,
  IssueComments,
} from "../components/IssueDetails/types";
import {
  withInitialCommentsHoc,
  initialCommentsState,
} from "../components/hoc/withInitialComments";

import { debounceScroll } from "../utils";

interface IssueDetailsComponent extends InfiniteScrollProps {
  scrollFetching?: boolean;
  wrapper?: RefObject<HTMLDivElement>;
  list?: RefObject<HTMLDivElement>;
  onOpenModal?: () => {};
}

interface IssueDetailsComponent extends initialCommentsState {}

const IssueDetailsContainer =
  (Wrapped: FC<IssueDetailsComponent>) => (props: withInitialCommentsHoc) => {
    const {
      currentIssueId,
      service: { githubApi },
      comments,
      issueText,
      listFetching,
    } = props;

    const [moreComments, setMoreComments] = useState<IssueComments[]>([]);

    const debounced = useCallback(
      debounceScroll(
        githubApi.getComments,
        (response: Promise<ApolloQueryResult<any>>) => {
          response
            .then(({ data }: { data: IssueDetailsData }) => {
              console.log(data);

              setMoreComments((moreComments) => [
                ...moreComments,
                ...data.node.comments.edges,
              ]);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      ),
      [githubApi.getComments]
    );

    const cursor = useMemo(() => {
      if (comments.length === 0) return "";

      return moreComments.length > 0
        ? moreComments[moreComments.length - 1].cursor
        : comments[comments.length - 1].cursor;
    }, [moreComments.length, comments]);

    const propsToWrapped: IssueDetailsComponent = {
      issueText,
      comments,
      fetchedItems: moreComments,
      fetchFunction: debounced,
      lastItemId: cursor,
      entityId: currentIssueId,
      listFetching,
    };

    return <Wrapped {...propsToWrapped} />;
  };

export default IssueDetailsContainer;
export type { IssueDetailsComponent };
