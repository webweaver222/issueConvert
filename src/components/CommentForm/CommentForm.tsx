import React, { useState, MouseEventHandler } from "react";
import GithubApolloService from "../../services/githubApolloService";
import FetchStatus from "../elements/fetchStatus";
import { IssueDetailsComponent } from "../../containers/IssueDetailsContainer";
import withAuthRequired from "../hoc/withAuthRequired";

interface CommentFormComponent extends IssueDetailsComponent {
  service: { githubApi: GithubApolloService; onAuth: MouseEventHandler };
  onClose: () => void;
}

const CommentForm = (props: CommentFormComponent) => {
  const {
    entityId,
    service: { githubApi },
    onPostComment,
    onClose,
  } = props;

  const [state, setState] = useState({
    input: "",
    fetching: false,
    error: "",
  });

  const { input, error, fetching } = state;

  const onChangeInput = (e: any) =>
    setState({ ...state, input: e.target.value });

  const onAddComment = () => {
    setState({ ...state, fetching: true });
    try {
      githubApi
        .addComment(entityId, input)
        .then((res) => {
          onPostComment(res.data.addComment.commentEdge);
          onClose();
        })
        .catch((e: Error) =>
          setState({ ...state, error: e.message, fetching: false })
        );
    } catch (e) {
      console.log(e, "try/catch");
    }
  };

  return (
    <div className="CommentFormWrapper">
      <FetchStatus
        onReset={null}
        status={error}
        fetching={fetching}
        render={() => (
          <>
            <textarea
              name="area1"
              id="comment"
              cols={50}
              rows={12}
              value={input}
              onChange={onChangeInput}
            ></textarea>
            <button onClick={onAddComment}>Add Comment</button>
          </>
        )}
      />
    </div>
  );
};

export default withAuthRequired(CommentForm);
export type { CommentFormComponent };
