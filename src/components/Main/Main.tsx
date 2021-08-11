import React, { useState } from "react";
import RepoSearch from "../RepoSearch";
//import "./Main.scss";

const Main = () => {
  const [issues, setIssues] = useState<Object | null>(null);

  console.log(issues);

  return (
    <div className="MainWrapper">
      <RepoSearch setIssues={(issues: Object) => setIssues(issues)} />
    </div>
  );
};

export default Main;
