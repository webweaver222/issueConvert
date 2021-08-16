import React, { useState, useEffect, useRef, useMemo } from "react";
import { compose } from "../../utils";
import useDidUpdateEffect from "../customHooks/didUpdateEffect";
import { withData as withIssues } from "../hoc/withData";
import { IssuesData, IssuesItem } from "../IssuesCabinet/types";
import Spinner from "../elements/spinner";
import "./IssuesList.scss";

const IssuesList = ({ service }: { service: IssuesData }) => {
  const {
    id,
    nameWithOwner,
    issues: { edges: issues },
  } = service;

  const wrapper = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);

  const [scroll, setScroll] = useState(0);

  const [fetching, setFetchimg] = useState(false);

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
      //loadMore(id, cursor)
    }
  }, [scroll]);

  const spinner = fetching && (
    <div className="lw">
      <Spinner width="20" height="20" />
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
        </div>
      </div>
      {spinner}
    </div>
  );
};

export default compose(withIssues)(IssuesList);
