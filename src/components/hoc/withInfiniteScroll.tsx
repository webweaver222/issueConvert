import React, { useEffect, useState, FC, useRef } from "react";
import useDidUpdateEffect from "../customHooks/didUpdateEffect";

import { IssuesListComponent } from "../../containers/IssueListContainer";
import { IssueDetailsComponent } from "../../containers/IssueDetailsContainer";

interface InfiniteScrollProps {
  fetchedItems: Array<any>;
  lastItemId?: string;
  entityId: string;
  fetchFunction: Function;
}

const withInfiniteScroll =
  (Wrapped: FC<IssuesListComponent | IssueDetailsComponent>) =>
  (props: InfiniteScrollProps) => {
    const { fetchedItems, fetchFunction, entityId, lastItemId } = props;
    const wrapper = useRef<HTMLDivElement>(null);
    const list = useRef<HTMLDivElement>(null);
    const [scroll, setScroll] = useState(0);
    const [fetching, setFetching] = useState(false);

    const handler = (e: any) => setScroll(e.target!.scrollTop);

    useEffect(() => {
      if (wrapper) {
        wrapper.current?.addEventListener("scroll", handler);
      }

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
      <Wrapped
        {...props}
        scrollFetching={fetching}
        wrapper={wrapper}
        list={list}
      />
    );
  };

export default withInfiniteScroll;
export type { InfiniteScrollProps };
