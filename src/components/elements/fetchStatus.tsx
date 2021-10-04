import React, { FC } from "react";

import Spinner from "../elements/spinner";

const FetchStatus = ({
  render,
  fetching,
  status,
  onReset,
}: {
  render: () => JSX.Element;
  fetching: boolean;
  status: string;
  onReset: (() => void) | null;
}) => {
  let content = render;

  if (fetching)
    content = () => (
      <div className="statusWrapper">
        <Spinner width="50" height="50" color="#5776f6" />
      </div>
    );

  if (status)
    content = () => (
      <div className="statusWrapper withError">
        <p>{status}</p>
        {onReset && <i className="fas fa-times" onClick={onReset}></i>}
      </div>
    );

  return content();
};

export default FetchStatus;
