import React, { FC } from "react";
import { AuthRedirect } from "../Auth/AuthRedirect";
import { withData } from "./withData";
import { CommentFormComponent } from "../CommentForm/CommentForm";

const withAuthRequired = (Wrapped: FC<any>) =>
  withData((props: CommentFormComponent) => {
    const {
      service: {
        githubApi: { oauth },
        onAuth,
      },
    } = props;

    if (!oauth) {
      return <AuthRedirect onAuth={onAuth} />;
    }

    return <Wrapped {...props} />;
  });

export default withAuthRequired;
