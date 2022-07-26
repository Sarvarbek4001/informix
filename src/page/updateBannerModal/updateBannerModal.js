import React, { useState, useEffect } from "react";
import Modal from "../modal/modal";
import "./updateBannerModal.scss";
function UpdateBannerModal(props) {
  const [textBannerUz, setTextBannerUz] = useState(
    props.bannerData.banner_title_uz
  );
  const [textBannerRu, setTextBannerRu] = useState(
    props.bannerData.banner_title_ru
  );
  const [textBannerEn, setTextBannerEn] = useState(
    props.bannerData.banner_title_en
  );

  const [formIsValid, setFormIsValid] = useState(false);

  const changeBannerTextUz = (evt) => {
    setTextBannerUz(evt.target.value);
  };
  const changeBannerTextRu = (evt) => {
    setTextBannerRu(evt.target.value);
  };
  const changeBannerTextEn = (evt) => {
    setTextBannerEn(evt.target.value);
  };

  useEffect(() => {
    if (
      textBannerUz.trim().length !==
        props.bannerData.banner_title_uz.trim().length &&
      textBannerRu.trim().length !==
        props.bannerData.banner_title_ru.trim().length &&
      textBannerEn.trim().length !==
        props.bannerData.banner_title_en.trim().length
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [textBannerUz, textBannerRu, textBannerEn]);

  const updateHandler = async (evt) => {
    evt.preventDefault();
    props.setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}/banner`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({
          bannerTitleUz: textBannerUz,
          bannerTitleRu: textBannerRu,
          bannerTitleEn: textBannerEn,
          bannerId: props.bannerData.banner_id,
        }),
      });
      if (response.ok) {
        props.hideAddBanner();
        props.setIsLoading(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Modal onHideCart={props.hideAddBanner}>
      <form className="update__banner-form" onSubmit={updateHandler}>
        <div className="update__banner-control">
          <textarea
            defaultValue={props.bannerData.banner_title_uz}
            onChange={changeBannerTextUz}
          />
        </div>
        <div className="update__banner-control">
          <textarea
            defaultValue={props.bannerData.banner_title_ru}
            onChange={changeBannerTextRu}
          />
        </div>
        <div className="update__banner-control">
          <textarea
            defaultValue={props.bannerData.banner_title_en}
            onChange={changeBannerTextEn}
          />
        </div>
        <div className="banner__form-buttons">
          <button
            className={`${formIsValid === true ? "btn__valid" : ""}`}
            disabled={!formIsValid}
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
      <div className="exist">
        <button type="btn" onClick={props.hideAddBanner}>
          <i className="bi bi-x"></i>
        </button>
      </div>
    </Modal>
  );
}

export default UpdateBannerModal;
