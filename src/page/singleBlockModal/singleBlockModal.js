import React, { useContext, useState, useEffect, useRef } from "react";
import Modal from "../modal/modal";
import BlockContext from "../../context/SingleBlock";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import "./singleBlockModal.scss";
function SingleBlockModal() {
  const ctx = useContext(BlockContext);
  const [titleUz, setTitleUz] = useState(ctx.data.title_uz);
  const [titleRu, setTitleRu] = useState(ctx.data.title_ru);
  const [titleEn, setTitleEn] = useState(ctx.data.title_en);

  const [contentUz, setContentUz] = useState(ctx.data.content_uz);
  const [contentRu, setContentRu] = useState(ctx.data.content_ru);
  const [contentEn, setContentEn] = useState(ctx.data.content_en);

  const [buttonNameUz, setButtonNameUz] = useState(ctx.data.btn_text_uz);
  const [buttonNameRu, setButtonNameRu] = useState(ctx.data.btn_text_ru);
  const [buttonNameEn, setButtonNameEn] = useState(ctx.data.btn_text_en);

  const [isChecked, setIsChecked] = useState(ctx.data.b_row_reverse);

  const titleChangeHandlerUz = (evt) => {
    setTitleUz(evt.target.value);
  };
  const titleChangeHandlerRu = (evt) => {
    setTitleRu(evt.target.value);
  };
  const titleChangeHandlerEn = (evt) => {
    setTitleEn(evt.target.value);
  };

  const contentChangeHandlerUz = (evt) => {
    setContentUz(evt.target.value);
  };
  const contentChangeHandlerRu = (evt) => {
    setContentRu(evt.target.value);
  };
  const contentChangeHandlerEn = (evt) => {
    setContentEn(evt.target.value);
  };

  const buttonNameChangeHandlerUz = (evt) => {
    setButtonNameUz(evt.target.value);
  };
  const buttonNameChangeHandlerRu = (evt) => {
    setButtonNameRu(evt.target.value);
  };
  const buttonNameChangeHandlerEn = (evt) => {
    setButtonNameEn(evt.target.value);
  };
  const checkboxHandler = (evt) => {
    setIsChecked(evt.target.checked);
  };
  const submitHandler = async (evt) => {
    evt.preventDefault();
    try {
      ctx.setIsLoading(true);
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({
          titleUz: titleUz,
          titleRu: titleRu,
          titleEn: titleEn,
          contentUz: contentUz,
          contentRu: contentRu,
          contentEn: contentEn,
          buttonNameUz: buttonNameUz,
          buttonNameRu: buttonNameRu,
          buttonNameEn: buttonNameEn,
          b_row_reverse: isChecked,
          blockId: ctx.data.block_id,
        }),
      };
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/block`,
        requestOptions
      );
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        ctx.setIsLoading(false);
        ctx.hideModal();
      } else {
        console.log("Error");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Modal onHideCart={ctx.hideModal}>
      <div className="single__block-modal">
        <form onSubmit={submitHandler}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <div className="single__block-control">
              <input
                type="text"
                onChange={titleChangeHandlerUz}
                defaultValue={ctx.data.title_uz}
              />
            </div>
            <div className="single__block-control">
              <input
                type="text"
                onChange={titleChangeHandlerRu}
                defaultValue={ctx.data.title_ru}
              />
            </div>
            <div className="single__block-control">
              <input
                type="text"
                onChange={titleChangeHandlerEn}
                defaultValue={ctx.data.title_en}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <div className="single__block-control">
              <textarea
                onChange={contentChangeHandlerUz}
                defaultValue={ctx.data.content_uz}
              />
            </div>
            <div className="single__block-control">
              <textarea
                onChange={contentChangeHandlerRu}
                defaultValue={ctx.data.content_ru}
              />
            </div>
            <div className="single__block-control">
              <textarea
                onChange={contentChangeHandlerEn}
                defaultValue={ctx.data.content_en}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <div className="single__block-control">
              <input
                type="text"
                onChange={buttonNameChangeHandlerUz}
                defaultValue={ctx.data.btn_text_uz}
              />
            </div>
            <div className="single__block-control">
              <input
                type="text"
                onChange={buttonNameChangeHandlerRu}
                defaultValue={ctx.data.btn_text_ru}
              />
            </div>
            <div className="single__block-control">
              <input
                type="text"
                onChange={buttonNameChangeHandlerEn}
                defaultValue={ctx.data.btn_text_en}
              />
            </div>
          </div>
          <div className="row__rewerse">
            <FormControlLabel
              label={
                <Typography
                  variant="h4"
                  style={{
                    color: "black",
                    fontSize: 16,
                  }}
                >
                  Row-rewerse
                </Typography>
              }
              control={
                <Checkbox
                  onChange={checkboxHandler}
                  defaultChecked={ctx.data.b_row_reverse}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 18,
                      color: "#000051",
                    },
                  }}
                />
              }
            />
          </div>
          <div className="single__block-btn">
            <button type="submit">Save</button>
          </div>
        </form>
        <div className="exist">
          <button type="btn" onClick={ctx.hideModal}>
            <i className="bi bi-x"></i>
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default SingleBlockModal;
