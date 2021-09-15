import React, { useState } from "react";
import GithubApolloService from "../../services/githubApolloService";
import { withData } from "../hoc/withData";
import "./CommentForm.scss";

const CommentForm = (props: any) => {
  const {
    entityId,
    service: { githubApi },
  }: {
    entityId: string;
    service: { githubApi: GithubApolloService };
  } = props;

  const [input, setInput] = useState("");

  const onChangeInput = (e: any) => setInput(e.target.value);

  const onAddComment = () => {
    try {
      githubApi
        .addComment(entityId, input)
        .then((res) => {})
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e, "try/catch");
    }
  };

  return (
    <div className="CommentFormWrapper">
      <textarea
        name="area1"
        id="comment"
        cols={50}
        rows={12}
        value={input}
        onChange={onChangeInput}
      ></textarea>
      <button onClick={onAddComment}>Add Comment</button>
    </div>
  );
};

export default withData(CommentForm);
