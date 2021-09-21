import React, { useState } from "react";
import IssuesList from "../IssuesList";
import IssueDetails from "../IssueDetails/IssueDetails";
import "./IssuesCabinet.scss";
import { IssuesItem } from "./types";
const IssuesCabinet = ({
  initialData: {
    issues: { edges: issues },
  },
}: {
  initialData: { issues: { edges: IssuesItem[] } };
}) => {
  const [currentIssueId, setCurrentIssue] = useState(issues[0].node.id);

  return (
    <div className="IssueCabinetWrapper">
      <header>PepoName</header>
      <main>
        <IssuesList onIssueClick={(id: string) => setCurrentIssue(id)} />
        <IssueDetails issueId={currentIssueId} />
      </main>
    </div>
  );
};

export default IssuesCabinet;
