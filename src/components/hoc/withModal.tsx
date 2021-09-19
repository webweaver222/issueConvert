import React, { FC, useState } from "react";
import Modal from "../elements/modal";
//import { IssueDetailsComponent } from "./withInitialComments";
import { IssueDetailsComponent } from "../../containers/IssueDetailsContainer";

const withModal =
  (modalScernario: (props: any) => JSX.Element) =>
  (Wrapped: FC<IssueDetailsComponent>) =>
  (props: IssueDetailsComponent) => {
    const [opened, setOpened] = useState(false);

    const openModal = () => setOpened(true);

    return (
      <>
        {opened && (
          <Modal propsToChildren={props} onClose={() => setOpened(false)}>
            {modalScernario}
          </Modal>
        )}
        <Wrapped {...props} onOpenModal={openModal} />
      </>
    );
  };

export default withModal;
