import { FC } from "react";

const compose =
  (...funcs: Function[]) =>
  (comp: FC<any>) => {
    return funcs.reduceRight((wrapped, func) => func(wrapped), comp);
  };

const debounce = (func: Function, cb: Function) => {
  let tm: NodeJS.Timeout;

  return (input: string) => {
    clearTimeout(tm);
    tm = setTimeout(() => {
      return cb(func(input));
    }, 1000);
  };
};

export { compose, debounce };
