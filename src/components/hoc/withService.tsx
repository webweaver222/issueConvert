import React from "react";

import { ServiceConsumer } from "../elements/service-provider";

const withGithubApi = (Wrapped: React.FC<any>) => {
  return (props: any) => (
    <ServiceConsumer>
      {(service) => <Wrapped {...props} service={service} />}
    </ServiceConsumer>
  );
};

export { withGithubApi };
