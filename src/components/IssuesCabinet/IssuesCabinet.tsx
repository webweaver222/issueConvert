import React, { useState } from "react";
import IssuesList from "../IssuesList";
import IssueDetails from "../IssueDetails/IssueDetails";
import "./IssuesCabinet.scss";

const IssuesCabinet = () => {
  const [currentIssueId, setCurrentIssue] = useState("");

  return (
    <div className="IssueCabinetWrapper">
      <IssuesList onIssueClick={(id: string) => setCurrentIssue(id)} />
      <IssueDetails currentIssueId={currentIssueId} />
    </div>
  );
};

export default IssuesCabinet;
