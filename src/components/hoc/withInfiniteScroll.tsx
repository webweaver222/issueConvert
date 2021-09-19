import React, { useEffect, useState, FC, useRef } from "react";
import useDidUpdateEffect from "../customHooks/didUpdateEffect";

import { IssuesListComponent } from "../../containers/IssueListContainer";
import { IssueDetailsComponent } from "../../containers/IssueDetailsContainer";

interface InfiniteScrollProps {
  fetchedItems: Array<any>;
  lastItemId?: string;
  entityId: string;
  fetchFunction: Function;
  allLoaded: boolean;
}

const withInfiniteScroll =
  (Wrapped: FC<IssuesListComponent | IssueDetailsComponent>) =>
  (props: InfiniteScrollProps & IssueDetailsComponent) => {
    const { fetchedItems, fetchFunction, entityId, lastItemId, allLoaded } =
      props;
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
        if (!fetching && !allLoaded) {
          fetchFunction(entityId, lastItemId);
        }

        if (!allLoaded) return setFetching(true);
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
