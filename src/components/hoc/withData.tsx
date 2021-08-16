import React from "react";

import { ServiceConsumer } from "../elements/service-provider";

const withData = (Wrapped: React.FC<any>) => {
  return (props: any) => (
    <ServiceConsumer>
      {(service) => <Wrapped {...props} service={service} />}
    </ServiceConsumer>
  );
};

export { withData };