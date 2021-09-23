import React, { useState, MouseEventHandler } from "react";
import IssuesList from "../IssuesList";
import IssueDetails from "../IssueDetails/IssueDetails";
import "./IssuesCabinet.scss";
import { IssuesItem } from "./types";

const IssuesCabinet = ({
  onReturn,
  initialData: {
    nameWithOwner,
    issues: { edges: issues },
  },
}: {
  onReturn: MouseEventHandler;
  initialData: { nameWithOwner: string; issues: { edges: IssuesItem[] } };
}) => {
  const [currentIssueId, setCurrentIssue] = useState(issues[0].node.id);

  return (
    <div className="IssueCabinetWrapper">
      <header>
        <svg className="arrow" onClick={onReturn}>
          <use xlinkHref="#arrow"></use>
        </svg>
        <span>{nameWithOwner}</span>
      </header>
      <main>
        <IssuesList onIssueClick={(id: string) => setCurrentIssue(id)} />
        <IssueDetails issueId={currentIssueId} />
      </main>
    </div>
  );
};

export default IssuesCabinet;
