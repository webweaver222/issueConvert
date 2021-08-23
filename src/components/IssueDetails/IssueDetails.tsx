import React from "react";
import IssueDetailsContainer, {
  IssueDetailsComponent,
} from "../../containers/IssueDetailsContainer";
import FetchStatus from "../elements/fetchStatus";
import "./IssueDetails.scss";

const IssueDetails = ({ data, fetching }: IssueDetailsComponent) => {
  return (
    <div className="IssueDetailsWrapper">
      <FetchStatus
        onReset={() => {}}
        status=""
        fetching={fetching}
        render={
          () => (
            <>
              <div className="IssueTextWrapper fancyScrollBar">
                <p className="IssueText">{data?.node.body}</p>
              </div>
            </>
          )
          /* <IssueComments/> //withInfiniteScroll
           * <CommentInput />
           *
           *
           *
           */
        }
      />
    </div>
  );
};

export default IssueDetailsContainer(IssueDetails);
