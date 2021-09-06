import React, { RefObject } from "react";
import { IssueComments as IssueCommentsType } from "../IssueDetails/types";
import Spinner from "../elements/spinner";
import FetchStatus from "../elements/fetchStatus";
import "./IssueComments.scss";

const IssueComments = ({
  comments,
  moreComments,
  wrapper,
  list,
  scrollFetching,
  listFetching,
}: {
  comments?: IssueCommentsType[];
  moreComments?: IssueCommentsType[];
  wrapper?: RefObject<HTMLDivElement>;
  list?: RefObject<HTMLDivElement>;
  scrollFetching?: boolean;
  listFetching?: boolean;
}) => {
  const spinner = scrollFetching && (
    <div className="loaderIcon">
      <Spinner width="40" height="40" color="#5E9CE2" />
    </div>
  );

  return (
    <div className="IssueCommentsContainer infiniteScroll">
      <div className="IssueCommentsWrapper fancyScrollBar" ref={wrapper}>
        <div className="IssueCommentsList" ref={list}>
          <FetchStatus
            onReset={() => {}}
            status=""
            fetching={listFetching!}
            render={() => (
              <>
                {comments &&
                  comments.map((comment) => (
                    <div className="IssueComment" key={comment.node.id}>
                      {comment.node.body}
                    </div>
                  ))}
                {moreComments &&
                  moreComments.map((comment) => (
                    <div className="IssueComment" key={comment.node.id}>
                      {comment.node.body}
                    </div>
                  ))}
              </>
            )}
          />

          {spinner}
        </div>
      </div>
    </div>
  );
};

export default IssueComments;
