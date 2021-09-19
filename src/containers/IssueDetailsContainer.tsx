import React, {
  FC,
  useState,
  useMemo,
  useCallback,
  RefObject,
  MouseEventHandler,
} from "react";
import { InfiniteScrollProps } from "../components/hoc/withInfiniteScroll";
import { ApolloQueryResult } from "@apollo/client";
import {
  IssueDetailsData,
  IssueComments,
} from "../components/IssueDetails/types";
import { IssueDetailsComponent as IssueDetailsProps } from "../components/hoc/withInitialComments";

import { debounceScroll } from "../utils";

interface IssueDetailsContainer extends InfiniteScrollProps, IssueDetailsProps {
  scrollFetching?: boolean;
  wrapper?: RefObject<HTMLDivElement>;
  list?: RefObject<HTMLDivElement>;
  onOpenModal?: MouseEventHandler<HTMLButtonElement>;
}

type IssueDetailsComponent = Omit<
  IssueDetailsContainer,
  "service" | "issueId" | "totalCount"
>;

const IssueDetailsContainer =
  (Wrapped: FC<IssueDetailsComponent>) => (props: IssueDetailsProps) => {
    const {
      issueId,
      service: { githubApi },
      comments,
      issueText,
      listFetching,
      onPostComment,
      totalCount,
    } = props;

    const [moreComments, setMoreComments] = useState<IssueComments[]>([]);

    const debounced = useCallback(
      debounceScroll(
        githubApi.getComments,
        (response: Promise<ApolloQueryResult<any>>) => {
          response
            .then(({ data }: { data: IssueDetailsData }) => {
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

    const allLoaded =
      comments.length + moreComments.length < totalCount ? false : true;

    const propsToWrapped: IssueDetailsComponent = {
      issueText,
      comments,
      fetchedItems: moreComments,
      fetchFunction: debounced,
      lastItemId: cursor,
      entityId: issueId,
      listFetching,
      onPostComment,
      allLoaded,
    };

    return <Wrapped {...propsToWrapped} />;
  };

export default IssueDetailsContainer;
export type { IssueDetailsComponent };
