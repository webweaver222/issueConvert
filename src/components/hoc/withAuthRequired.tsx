import React, { FC } from "react";
import { withData } from "./withData";
import { CommentFormComponent } from "../CommentForm/CommentForm";

const Test = () => {
  return <div>1</div>;
};

const withAuthRequired = (Wrapped: FC<any>) =>
  withData((props: CommentFormComponent) => {
    if (!props.service.githubApi.oauth) {
      return <Test />;
    }

    return <Wrapped {...props} />;
  });

export default withAuthRequired;
