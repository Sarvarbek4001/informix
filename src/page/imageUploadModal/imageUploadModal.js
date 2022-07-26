import React from "react";
import ReactDOM from "react-dom";
import "./imageUploadModal.scss";

const ImageUploadBackdrop = (props) => {
  return (
    <div className="image__upload-backdrop" onClick={props.onHideModal}></div>
  );
};

const ImageUploadModalWindow = (props) => {
  return (
    <div className="image__upload-modal">
      <div className="content">{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlay");

const ImageUploadModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <ImageUploadBackdrop onHideModal={props.onHideModal} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ImageUploadModalWindow>{props.children}</ImageUploadModalWindow>,
        portalElement
      )}
    </React.Fragment>
  );
};
export default ImageUploadModal;
