import * as React from "react";
import FetchStatus from "./fetchStatus";

export const AuthErrorMessage = () => (
  <FetchStatus
    onReset={null}
    render={() => <></>}
    fetching={false}
    status="Authentication error. Please Try again later."
  />
);
