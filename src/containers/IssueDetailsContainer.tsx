import React, {
  FC,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { IssuesData } from "../components/IssuesCabinet/types";
import GithubApolloService from "../services/githubApolloService";
import { withData } from "../components/hoc/withData";
import useDidUpdateEffect from "../components/customHooks/didUpdateEffect";
import { InfiniteScrollProps } from "../components/hoc/withInfiniteScroll";
import { ApolloQueryResult } from "@apollo/client";
import {
  IssueDetailsData,
  IssueComments,
} from "../components/IssueDetails/types";

import { debounceScroll } from "../utils";

interface IssueDetailsContainerProps {
  currentIssueId: string;
  service: {
    data: IssuesData;
    githubApi: GithubApolloService;
  };
}

interface IssueDetailsComponent extends InfiniteScrollProps {
  issueText?: string;
  comments?: IssueComments[];
  fetching: boolean;
}

const IssueDetailsContainer = (Wrapped: FC<IssueDetailsComponent>) =>
  withData((props: IssueDetailsContainerProps) => {
    const {
      currentIssueId,
      service: {
        data: {
          id,
          issues: { edges: comments },
        },
        githubApi,
      },
    } = props;

    const wrapper = useRef(null);
    const list = useRef(null);

    const [data, setData] = useState<IssueDetailsData | null>(null);
    const [moreComments, setMoreComments] = useState<IssueComments[]>([]);
    const [fetching, setFetching] = useState(false);

    const cursor = useMemo(
      () =>
        moreComments.length > 0
          ? moreComments[moreComments.length - 1].cursor
          : comments[comments.length - 1].cursor,
      [moreComments.length]
    );

    const debounced = useCallback(
      debounceScroll(
        githubApi.getComments,
        (response: Promise<ApolloQueryResult<any>>) => {
          response
            .then(({ data }: { data: any }) => {
              console.log(data);
              /*
                setMoreComments((moreComments) => [
                  ...moreComments,
                  ...evenMoreComments.comments.edges,
                ]);*/
            })
            .catch((e) => {
              console.log(e);
            });
        }
      ),
      [githubApi.getComments]
    );

    useEffect(() => {
      setFetching(true);
      githubApi.getComments(comments[0].node.id).then(({ data }) => {
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
      issueText: data?.node.body,
      comments: data?.node.comments.edges,
      fetching,
      fetchedItems: moreComments,
      fetchFunction: debounced,
      lastItemId: cursor,
      entityId: currentIssueId,
      wrapper,
      list,
    };

    return <Wrapped {...propsToWrapped} />;
  });

export default IssueDetailsContainer;
export type { IssueDetailsComponent };
