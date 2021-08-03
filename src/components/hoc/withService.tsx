import React from "react";
//import GitgubApolloService from "../../services/githubApolloService";

import { ServiceConsumer } from "../elements/service-provider";

const withGithubApi = (Wrapped: React.FC) => {
  return (props: any) => (
    <ServiceConsumer>
      {(service) => <Wrapped {...props} service={service} />}
    </ServiceConsumer>
  );
};

export { withGithubApi };
