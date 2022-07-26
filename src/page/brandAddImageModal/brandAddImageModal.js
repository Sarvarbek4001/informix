import React, { useState } from "react";
import "./brandAddImageModal.scss";
import Modal from "../modal/modal";
import defaultBrandImage from "../../assets/images/add_image.png";

function BrandAddImageModal(props) {
  const [image, setImage] = useState({
    preview:
      "https://media.flaticon.com/dist/min/img/collections/collection-tour.svg",
    data: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    props.setIsImageLoading(false);
    const formData = new FormData();
    formData.append("image", image.data);
    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}/brand`, {
        method: "post",
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: formData,
      });
      console.log(response);
      if (response.ok) {
        props.onHideCart();
        props.setIsImageLoading(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileChange = (e) => {
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    });
  };
  return (
    <Modal onHideCart={props.onHideCart}>
      {/* <h1 className="brand__header-text"> Add a brand.</h1> */}
      <div className="brand__add-item">
        <div className="brand__add-input">
          <label htmlFor="fileImage">
            Upload a file<i className="bi bi-cloud-upload"></i>
          </label>
          <input type="file" id="fileImage" onChange={handleFileChange} />
        </div>
        <div className="brand__add-image">
          <img src={image.preview} width="300" height="250" />
        </div>
      </div>
      <div className="btn__items-modal">
        <button className="btn__close" onClick={props.onHideCart}>
          Close
        </button>
        <button
          className={`btn__save ${image && "btn_save--opacity"}`}
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </Modal>
  );
}

export default BrandAddImageModal;
