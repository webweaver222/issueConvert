import React from "react";
import IssueDetailsContainer, {
  IssueDetailsComponent,
} from "../../containers/IssueDetailsContainer";
import IssueComments from "../IssueComments";
import withInitialComments from "../hoc/withInitialComments";
import withInfiniteScroll from "../hoc/withInfiniteScroll";
import withAddCommentModal from "../hoc/withAddCommentModal";
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
  onOpenModal,
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

      <div className="controls">
        <button onClick={onOpenModal}>Add Comment</button>
      </div>
    </div>
  );
};

export default compose(
  withInitialComments,
  IssueDetailsContainer,
  withInfiniteScroll,
  withAddCommentModal
)(IssueDetails);
