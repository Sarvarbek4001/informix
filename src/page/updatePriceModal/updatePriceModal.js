import React, { useState, useEffect } from "react";
import Modal from "../modal/modal";
import "./updatePriceModal.scss";
import SendIcon from "@mui/icons-material/Send";
function UpdatePriceModal(props) {
  console.log(props.array);
  const [inputTitleUz, setInputTitleUz] = useState(props.array.price_title_uz);
  const [inputTitleRu, setInputTitleRu] = useState(props.array.price_title_ru);
  const [inputTitleEn, setInputTitleEn] = useState(props.array.price_title_en);
  const [inputPrice, setInputPrice] = useState(props.array.price_number);
  const [inputContentUz, setInputContentUz] = useState(
    props.array.price_sub_title_uz
  );
  const [inputContentRu, setInputContentRu] = useState(
    props.array.price_sub_title_ru
  );
  const [inputContentEn, setInputContentEn] = useState(
    props.array.price_sub_title_en
  );
  const [formIsValid, setFormIsValid] = useState(false);

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
      inputTitleUz.trim().length !== props.array.price_title_uz.length ||
      inputTitleRu.trim().length !== props.array.price_title_ru.length ||
      inputTitleEn.trim().length !== props.array.price_title_en.length ||
      inputPrice.trim().length !== props.array.price_number.length ||
      inputContentUz.trim().length !== props.array.price_sub_title_uz.length ||
      inputContentRu.trim().length !== props.array.price_sub_title_ru.length ||
      inputContentEn.trim().length !== props.array.price_sub_title_en.length
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
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

  const submitHandler = async (evt) => {
    evt.preventDefault();
    props.setIsLoading(true);
    const requestOptions = {
      method: "PUT",
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
        priceId: props.array.price_id,
      }),
    };
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/price`,
      requestOptions
    );
    if (response.ok) {
      props.hidePriceModal();
      props.setIsLoading(false);
    }
  };
  return (
    <Modal onHideCart={props.hidePriceModal}>
      <form className="update__price--from" onSubmit={submitHandler}>
        <div className="update__price--form-control">
          <input
            type="text"
            defaultValue={props.array.price_title_uz}
            onChange={titleChangeHandlerUz}
          />
        </div>
        <div className="update__price--form-control">
          <input
            type="text"
            defaultValue={props.array.price_title_ru}
            onChange={titleChangeHandlerRu}
          />
        </div>
        <div className="update__price--form-control">
          <input
            type="text"
            defaultValue={props.array.price_title_en}
            onChange={titleChangeHandlerEn}
          />
        </div>
        <div className="update__price--form-control">
          <input
            type="text"
            defaultValue={props.array.price_number}
            onChange={priceChangeHandler}
          />
        </div>
        <div className="update__price--form-control">
          <input
            type="text"
            defaultValue={props.array.price_sub_title_uz}
            onChange={contentChangeHandlerUz}
          />
        </div>
        <div className="update__price--form-control">
          <input
            type="text"
            defaultValue={props.array.price_sub_title_ru}
            onChange={contentChangeHandlerRu}
          />
        </div>
        <div className="update__price--form-control">
          <input
            type="text"
            defaultValue={props.array.price_sub_title_en}
            onChange={contentChangeHandlerEn}
          />
        </div>
        <div className="update__price--send-btn">
          <button
            type="submit"
            disabled={!formIsValid}
            className={`${formIsValid === true ? "btn-hover" : null}`}
          >
            Save
            <SendIcon fontSize="large" sx={{ marginLeft: "5px" }} />
          </button>
        </div>
      </form>
      <div className="exist">
        <button type="btn" onClick={props.hidePriceModal}>
          <i className="bi bi-x"></i>
        </button>
      </div>
    </Modal>
  );
}

export default UpdatePriceModal;
