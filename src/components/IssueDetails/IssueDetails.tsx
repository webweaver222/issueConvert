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
  scrollFetching,
  comments,
  fetchedItems: moreComments,
  wrapper,
  list,
  listFetching,
}: IssueDetailsComponent) => {
  return (
    <div className="IssueDetailsWrapper">
      <div className="IssueTextWrapper fancyScrollBar">
        <p className="IssueText">{issueText}</p>
      </div>

      <IssueComments
        comments={comments}
        moreComments={moreComments}
        wrapper={wrapper}
        list={list}
        scrollFetching={scrollFetching}
        listFetching={listFetching}
      />
    </div>
  );
};

export default compose(IssueDetailsContainer, withInfiniteScroll)(IssueDetails);
