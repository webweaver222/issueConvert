import React, { useState, useEffect, useRef } from "react";
import { compose } from "../../utils";
import useDidUpdateEffect from "../customHooks/didUpdateEffect";
import { withData as withIssues } from "../hoc/withData";
import { IssuesData } from "../IssuesCabinet/types";
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

  /**const [fetching, setFetchimg] = useState(false) */

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
      console.log("load more");
      //loadMore()
    }
  }, [scroll]);

  return (
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
  );
};

export default compose(withIssues)(IssuesList);
