import React, { FC, useState } from "react";
import Modal from "../elements/modal";
//import { IssueDetailsComponent } from "./withInitialComments";
import { IssueDetailsComponent } from "../../containers/IssueDetailsContainer";

const withModal =
  (modalScernario: (props: any) => JSX.Element) =>
  (Wrapped: FC<IssueDetailsComponent>) =>
  (props: IssueDetailsComponent) => {
    console.log(props);
    const [state, setState] = useState<{
      opened: boolean;
    }>({
      opened: false,
    });

    const openModal = () => {
      setState({ ...state, opened: true });
    };

    return (
      <>
        {state.opened && (
          <Modal
            propsToChildren={props}
            onClose={() => setState({ ...state, opened: false })}
          >
            {modalScernario}
          </Modal>
        )}
        <Wrapped {...props} onOpenModal={openModal} />
      </>
    );
  };

export default withModal;
