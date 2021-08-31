import React, {
  FC,
  useState,
  useEffect,
  useMemo,
  useCallback,
  RefObject,
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
  scrollFetching?: boolean;
  wrapper?: RefObject<HTMLDivElement>;
  list?: RefObject<HTMLDivElement>;
  listFetching?: boolean;
}

const IssueDetailsContainer = (Wrapped: FC<IssueDetailsComponent>) =>
  withData((props: IssueDetailsContainerProps) => {
    const {
      currentIssueId,
      service: { githubApi },
    } = props;

    const [issueText, setText] = useState("");
    const [comments, setComments] = useState<IssueComments[]>([]);
    const [moreComments, setMoreComments] = useState<IssueComments[]>([]);
    const [listFetching, setFetching] = useState(false);

    const loadData = () => {
      setFetching(true);
      githubApi
        .getComments(currentIssueId)
        .then(({ data }: { data: IssueDetailsData }) => {
          setText(data.node.body);
          setComments(data.node.comments.edges);
          setFetching(false);
        });
    };

    useEffect(() => {
      loadData();
    }, []);

    useDidUpdateEffect(() => {
      loadData();
    }, [currentIssueId]);

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
  });

export default IssueDetailsContainer;
export type { IssueDetailsComponent };
