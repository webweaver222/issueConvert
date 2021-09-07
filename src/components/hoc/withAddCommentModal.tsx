import React, { FC, useState } from "react";
import ReactDom from "react-dom";
import { IssueDetailsComponent } from "../../containers/IssueDetailsContainer";

const Modal = ({
  children,
  onClose,
}: {
  children: any;
  onClose: () => void;
}) => {
  const MODAL_STYLES = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFF",
    padding: "50px",
    zIndex: "1000",
  };

  const OVERLAY_STYLES = {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, .7)",
    zIndex: "1000",
  };

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        {children} <button onClick={onClose}>Close Modal</button>
      </div>
    </>,
    document.getElementById("portal")
  );
};

const withAddCommentModal =
  (Wrapped: FC<IssueDetailsComponent>) => (props: any) => {
    const [opened, setOpened] = useState(false);

    const openModal = () => setOpened(true);

    return (
      <>
        {opened && <Modal onClose={() => setOpened(false)}>Modal</Modal>}
        <Wrapped {...props} onOpenModal={openModal} />
      </>
    );
  };

export default withAddCommentModal;
