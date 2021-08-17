import React from "react";

import { ServiceConsumer } from "../elements/service-provider";

const withData = (Wrapped: React.FC<any>) => {
  return (props: any) => (
    <ServiceConsumer>
      {(service) => <Wrapped {...props} service={service} />}
    </ServiceConsumer>
  );
};

const withApi = (Wrapped: React.FC<any>) => {
  return (props: any) => (
    <ServiceConsumer>
      {(api) => <Wrapped {...props} api={api} />}
    </ServiceConsumer>
  );
};

export { withData, withApi };
