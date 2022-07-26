import React, { useState, useEffect } from "react";
import ImageUploadModal from "../imageUploadModal/imageUploadModal";
import "./blockImageUploadModal.scss";
function BlockImageUploadModal(props) {
  const [image, setImage] = useState({
    preview:
      "https://media.flaticon.com/dist/min/img/collections/collection-tour.svg",
    data: "",
  });
  const [valid, setIsValid] = useState(false);
  const [blockImage, setBlockImage] = useState();

  const getImageHandler = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/blockImage/${id}`
      );
      if (response.ok) {
        setBlockImage(`${process.env.REACT_APP_HOST}/blockImage/${id}`);
      } else {
        setIsValid(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getImageHandler(props.imageId);
  }, [props.imageId]);

  const handleFileChange = (e) => {
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.data);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/blockImage/${props.imageId}`,
        {
          method: "post",
          headers: {
            authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
          body: formData,
        }
      );
      if (response.ok) {
        props.hideImageUploadBlockModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/blockImage/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        }
      );
      if (response.ok) {
        props.hideImageUploadBlockModal();
      } else {
        console.log("XATOLIK");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <ImageUploadModal onHideModal={props.hideImageUploadBlockModal}>
      <div className="block__image-modal">
        {valid && (
          <div className="image__upload-section">
            <div className="image__upload-intro">
              <label htmlFor="imageUpload">
                Upload Image<i className="bi bi-cloud-upload-fill"></i>
              </label>
              <input type="file" id="imageUpload" onChange={handleFileChange} />
              <button className="image__delete" onClick={handleSubmit}>
                Save
              </button>
            </div>
            <div className="image__preview">
              <img src={image.preview} width="600" height="400" />
            </div>
          </div>
        )}
        {!valid && (
          <div className="image__preview-section">
            <button
              className="image__delete"
              onClick={() => handleDelete(props.imageId)}
            >
              Delete
            </button>
            <div>
              {blockImage && <img src={blockImage} width={600} height={400} />}
            </div>
          </div>
        )}
      </div>
      <div className="exist">
        <button type="btn" onClick={props.hideImageUploadBlockModal}>
          <i className="bi bi-x"></i>
        </button>
      </div>
    </ImageUploadModal>
  );
}

export default BlockImageUploadModal;
