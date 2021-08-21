import { StringifyOptions } from "querystring";
import { FC } from "react";

const compose =
  (...funcs: Function[]) =>
  (comp: FC<any>) => {
    return funcs.reduceRight((wrapped, func) => func(wrapped), comp);
  };

const debounceSearch = (func: Function, cb: Function) => {
  let tm: NodeJS.Timeout;

  return (input: string) => {
    clearTimeout(tm);
    if (!input) return;
    tm = setTimeout(() => {
      return cb(func(input));
    }, 1000);
  };
};

const debounceScroll = (func: Function, cb: Function) => {
  let tm: NodeJS.Timeout;

  return (id: string, cursor: StringifyOptions) => {
    clearTimeout(tm);
    tm = setTimeout(() => {
      return cb(func(id, cursor));
    }, 1000);
  };
};

export { compose, debounceSearch, debounceScroll };
