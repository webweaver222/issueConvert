import React from "react";
import ReactDom from "react-dom";

const Modal = ({
  children,
  onClose,
  propsToChildren,
}: {
  propsToChildren: {};
  children: any;
  onClose: () => void;
}) => {
  const portalDiv = document.getElementById("portal");

  return portalDiv
    ? ReactDom.createPortal(
        <>
          <div className="overlay" />
          <div className="modal">
            <i className="fas fa-times" onClick={onClose}></i>
            {children({
              ...propsToChildren,
              onClose,
            })}
          </div>
        </>,
        portalDiv
      )
    : null;
};

export default Modal;
