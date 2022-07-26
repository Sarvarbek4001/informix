import React, { useState, useEffect } from "react";
import "./addPriceModal.scss";
import Modal from "../modal/modal";
import SendIcon from "@mui/icons-material/Send";
function AddPriceModal(props) {
  const [inputTitleUz, setInputTitleUz] = useState("");
  const [inputTitleRu, setInputTitleRu] = useState("");
  const [inputTitleEn, setInputTitleEn] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputContentUz, setInputContentUz] = useState("");
  const [inputContentRu, setInputContentRu] = useState("");
  const [inputContentEn, setInputContentEn] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);
  const titleChangeHandlerUz = (evt) => {
    setInputTitleUz(evt.target.value);
  };
  const titleChangeHandlerRu = (evt) => {
    setInputTitleRu(evt.target.value);
  };
  const titleChangeHandlerEn = (evt) => {
    setInputTitleEn(evt.target.value);
  };
  const priceChangeHandler = (evt) => {
    setInputPrice(evt.target.value);
  };
  const contentChangeHandlerUz = (evt) => {
    setInputContentUz(evt.target.value);
  };
  const contentChangeHandlerRu = (evt) => {
    setInputContentRu(evt.target.value);
  };
  const contentChangeHandlerEn = (evt) => {
    setInputContentEn(evt.target.value);
  };
  useEffect(() => {
    if (
      inputTitleUz.trim().length > 0 &&
      inputTitleRu.trim().length > 0 &&
      inputTitleEn.trim().length > 0 &&
      inputPrice.trim().length > 0 &&
      inputContentUz.trim().length > 0 &&
      inputContentRu.trim().length > 0 &&
      inputContentEn.trim().length > 0
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [
    inputTitleUz,
    inputTitleRu,
    inputTitleEn,
    inputPrice,
    inputContentUz,
    inputContentRu,
    inputContentEn,
  ]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    props.setIsLoading(true);
    if (isFormValid) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({
          priceTitleUz: inputTitleUz,
          priceTitleRu: inputTitleRu,
          priceTitleEn: inputTitleEn,
          priceNumber: inputPrice,
          priceSubTitleUz: inputContentUz,
          priceSubTitleRu: inputContentRu,
          priceSubTitleEn: inputContentEn,
        }),
      };
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/price`,
        requestOptions
      );
      if (response.ok) {
        props.hideAddPriceModal();
        props.setIsLoading(false);
      }
    }
  };
  return (
    <Modal onHideCart={props.hideAddPriceModal}>
      <form className="add__price--from" onSubmit={handleSubmit}>
        <div className="add__price--form-control">
          <input
            type="text"
            placeholder="Sarlavha"
            onChange={titleChangeHandlerUz}
          />
        </div>
        <div className="add__price--form-control">
          <input
            type="text"
            placeholder="Заголовок"
            onChange={titleChangeHandlerRu}
          />
        </div>
        <div className="add__price--form-control">
          <input
            type="text"
            placeholder="Title"
            onChange={titleChangeHandlerEn}
          />
        </div>
        <div className="add__price--form-control">
          <input
            type="text"
            placeholder="Price"
            onChange={priceChangeHandler}
          />
        </div>
        <div className="add__price--form-control">
          <input
            type="text"
            placeholder="Izoh"
            onChange={contentChangeHandlerUz}
          />
        </div>
        <div className="add__price--form-control">
          <input
            type="text"
            placeholder="Объяснение"
            onChange={contentChangeHandlerRu}
          />
        </div>
        <div className="add__price--form-control">
          <input
            type="text"
            placeholder="Explanation"
            onChange={contentChangeHandlerEn}
          />
        </div>
        <div className="add__price--send-btn">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`${isFormValid === true ? "add_btn-hover" : null}`}
          >
            Save
            <SendIcon fontSize="large" sx={{ marginLeft: "5px" }} />
          </button>
        </div>
      </form>
      <div className="exist">
        <button type="btn" onClick={props.hideAddPriceModal}>
          <i className="bi bi-x"></i>
        </button>
      </div>
    </Modal>
  );
}
export default AddPriceModal;
