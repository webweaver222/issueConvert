import React, { useState, useEffect, useRef, useMemo } from "react";
import { compose } from "../../utils";
import useDidUpdateEffect from "../customHooks/didUpdateEffect";
import { withData as withIssues } from "../hoc/withData";
import { IssuesData, IssuesItem } from "../IssuesCabinet/types";
import { withData } from "../hoc/withData";
import GithubApolloService from "../../services/githubApolloService";
import Spinner from "../elements/spinner";
import "./IssuesList.scss";

const IssuesList = (props: any) => {
  const {
    service: { data, githubApi },
  }: {
    service: {
      data: IssuesData;
      githubApi: GithubApolloService;
    };
  } = props;

  const {
    id,
    nameWithOwner,
    issues: { edges: issues },
  } = data;

  const wrapper = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);

  const [scroll, setScroll] = useState(0);

  const [fetching, setFetching] = useState(false);

  const [moreIssues, setMoreIssues] = useState<IssuesItem[]>([]);

  const cursor = useMemo(
    () =>
      moreIssues.length > 0
        ? moreIssues[moreIssues.length - 1].cursor
        : issues[issues.length - 1].cursor,
    [moreIssues.length]
  );

  useEffect(() => {
    const handler = (e: any) => setScroll(e.target!.scrollTop);

    if (wrapper) wrapper.current?.addEventListener("scroll", handler);

    return () => wrapper.current?.removeEventListener("scroll", handler);
  }, []);

  useDidUpdateEffect(() => {
    if (
      scroll + wrapper.current!.offsetHeight + 0 >
      list.current!.offsetHeight
    ) {
      if (!fetching)
        githubApi
          .getIssues(id, cursor)
          .then(({ data }) => {
            const more: IssuesData = data.node;
            setFetching(false);
            console.log(more.issues);
            setMoreIssues(more.issues.edges);
          })
          .catch((e) => {
            setFetching(false);
            console.log(e.message);
          });

      setFetching(true);
    }
  }, [scroll]);

  const spinner = fetching && (
    <div className="lw">
      <Spinner width="40" height="40" />
    </div>
  );

  return (
    <div className="issueListContainer">
      <div className="IssuesListWrapper" ref={wrapper}>
        <div className="issueList" ref={list}>
          {issues.map((issue, i) => (
            <div className="issueItem" key={i}>
              <h2>{issue.node.title}</h2>
              <p>{issue.node.body}</p>
            </div>
          ))}
          {moreIssues.map((issue, i) => (
            <div className="issueItem" key={i}>
              <h2>{issue.node.title}</h2>
              <p>{issue.node.body}</p>
            </div>
          ))}
        </div>
      </div>
      {spinner}
    </div>
  );
};

export default compose(withData, withIssues)(IssuesList);
