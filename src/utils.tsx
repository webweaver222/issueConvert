import { FC } from "react";

const compose = (...funcs: Function[]) => (comp: FC) => {
  return funcs.reduceRight((wrapped, func) => func(wrapped), comp);
};

export { compose };
