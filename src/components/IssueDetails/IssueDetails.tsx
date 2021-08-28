import React from "react";
import IssueDetailsContainer, {
  IssueDetailsComponent,
} from "../../containers/IssueDetailsContainer";
import IssueComments from "../IssueComments";
import FetchStatus from "../elements/fetchStatus";
import withInfiniteScroll from "../hoc/withInfiniteScroll";
import { compose } from "../../utils";
import "./IssueDetails.scss";

const IssueDetails = ({
  issueText,
  fetching,
  comments,
  fetchedItems: moreComments,
  wrapper,
  list,
}: IssueDetailsComponent) => {
  return (
    <div className="IssueDetailsWrapper">
      <FetchStatus
        onReset={() => {}}
        status=""
        fetching={fetching}
        render={() => (
          <>
            <div className="IssueTextWrapper fancyScrollBar">
              <p className="IssueText">{issueText}</p>
            </div>
            {
              <IssueComments
                comments={comments}
                moreComments={moreComments}
                wrapper={wrapper}
                list={list}
              />
            }
          </>
        )}
      />
    </div>
  );
};

export default compose(IssueDetailsContainer, withInfiniteScroll)(IssueDetails);
