import React, { useEffect, useState, FC, useRef } from "react";
import useDidUpdateEffect from "../customHooks/didUpdateEffect";

import { IssuesListComponent } from "../../containers/IssueListContainer";

interface InfiniteScrollProps {
  fetchedItems: Array<any>;
  lastItemId: string;
  entityId: string;
  fetchFunction: Function;
}

const withInfiniteScroll =
  (Wrapped: FC<IssuesListComponent>) => (props: InfiniteScrollProps) => {
    const { fetchedItems, fetchFunction, entityId, lastItemId } = props;

    const wrapper = useRef<HTMLDivElement>(null);
    const list = useRef<HTMLDivElement>(null);

    const [scroll, setScroll] = useState(0);

    const [fetching, setFetching] = useState(false);

    useEffect(() => {
      const handler = (e: any) => setScroll(e.target!.scrollTop);

      if (wrapper) wrapper.current?.addEventListener("scroll", handler);

      return () => wrapper.current?.removeEventListener("scroll", handler);
    }, []);

    useDidUpdateEffect(() => {
      if (
        scroll + wrapper.current!.offsetHeight + 0 >
        list.current!.offsetHeight
      ) {
        if (!fetching) {
          fetchFunction(entityId, lastItemId);
        }

        return setFetching(true);
      }

      return setFetching(false);
    }, [scroll]);

    useDidUpdateEffect(() => {
      setFetching(false);
    }, [fetchedItems.length]);

    return (
      <Wrapped {...props} fetching={fetching} wrapper={wrapper} list={list} />
    );
  };

export default withInfiniteScroll;
export type { InfiniteScrollProps };
