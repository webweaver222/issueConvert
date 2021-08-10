import React, { FC } from "react";

import Spinner from "../elements/spinner";

const FetchStatus = ({
  render,
  fetching,
}: //status,
{
  render: () => JSX.Element;
  fetching: boolean;
  //status: string;
}) => {
  let content: () => JSX.Element = render;

  if (fetching)
    content = () => (
      <div className="statusWrapper">
        <Spinner width="50" height="50" />
      </div>
    );

  //if (status) content = () => <div className="error">Error</div>;

  return content();
};

export default FetchStatus;
