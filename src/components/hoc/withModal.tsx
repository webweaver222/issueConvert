import React, { FC, useState } from "react";
import Modal from "../elements/modal";
import { IssueDetailsComponent } from "../../containers/IssueDetailsContainer";

const AddComment = () => <>Add Comment Modal</>;

const withModal =
  (modalScernario: (props: any) => JSX.Element) =>
  (Wrapped: FC<IssueDetailsComponent>) =>
  (props: any) => {
    const [opened, setOpened] = useState(false);

    const openModal = () => setOpened(true);

    return (
      <>
        {opened && (
          <Modal onClose={() => setOpened(false)}>{modalScernario}</Modal>
        )}
        <Wrapped {...props} onOpenModal={openModal} />
      </>
    );
  };

export default withModal;
export { AddComment };
