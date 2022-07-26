import React, { useState, useRef, useEffect, useContext } from "react";
import Modal from "../modal/modal";
import "./addBlockModal.scss";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import BlockContext from "../../context/SingleBlock";
function AddBlockModal(props) {
  const ctx = useContext(BlockContext);
  const sectionId = useRef();
  const [titleUz, setTitleUz] = useState("");
  const [titleRu, setTitleRu] = useState("");
  const [titleEn, setTitleEn] = useState("");

  const [contentUz, setContentUz] = useState("");
  const [contentRu, setContentRu] = useState("");
  const [contentEn, setContentEn] = useState("");

  const [buttonNameUz, setButtonNameUz] = useState("");
  const [buttonNameRu, setButtonNameRu] = useState("");
  const [buttonNameEn, setButtonNameEn] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

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
  useEffect(() => {
    if (
      titleUz.length !== 0 &&
      titleRu.length !== 0 &&
      titleEn.length !== 0 &&
      contentUz.length !== 0 &&
      contentRu.length !== 0 &&
      contentEn.length !== 0 &&
      contentUz.length !== 0 &&
      buttonNameUz.length !== 0 &&
      buttonNameRu.length !== 0 &&
      buttonNameEn.length !== 0
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [
    titleUz,
    titleRu,
    titleEn,
    contentUz,
    contentRu,
    contentEn,
    buttonNameUz,
    buttonNameRu,
    buttonNameEn,
  ]);
  const submitHandler = async (evt) => {
    evt.preventDefault();
    try {
      ctx.setIsLoading(true);
      const requestOptions = {
        method: "POST",
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
          section_id: sectionId.current.value,
          b_row_reverse: isChecked,
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
        props.hideAddBlockModal();
      } else {
        console.log("Error");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Modal onHideCart={props.hideAddBlockModal}>
      <div className="add__block-modal">
        <form onSubmit={submitHandler}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="form__block-control">
              <label>UZ:</label>
              <input
                type="text"
                id="title"
                placeholder="Sarlavha"
                onChange={titleChangeHandlerUz}
              />
            </div>
            <div className="form__block-control">
              <label>RU:</label>
              <input
                type="text"
                id="title"
                placeholder="Заголовок"
                onChange={titleChangeHandlerRu}
              />
            </div>
            <div className="form__block-control">
              <label>EN:</label>
              <input
                type="text"
                id="title"
                placeholder="Title"
                onChange={titleChangeHandlerEn}
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="form__block-control">
              <textarea
                placeholder="Mazmuni"
                onChange={contentChangeHandlerUz}
              />
            </div>
            <div className="form__block-control">
              <textarea
                placeholder="Содержание"
                onChange={contentChangeHandlerRu}
              />
            </div>
            <div className="form__block-control">
              <textarea
                placeholder="Content"
                onChange={contentChangeHandlerEn}
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="form__block-control">
              <input
                type="text"
                id="title"
                placeholder="Tugma nomi"
                onChange={buttonNameChangeHandlerUz}
              />
            </div>
            <div className="form__block-control">
              <input
                type="text"
                id="title"
                placeholder="Название кнопки"
                onChange={buttonNameChangeHandlerRu}
              />
            </div>
            <div className="form__block-control">
              <input
                type="text"
                id="title"
                placeholder="Button name"
                onChange={buttonNameChangeHandlerEn}
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
                    fontWeight: 400,
                  }}
                >
                  Row-rewerse
                </Typography>
              }
              control={
                <Checkbox
                  onChange={checkboxHandler}
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
          <div className=" block-control ">
            <select ref={sectionId}>
              <option value="1">Section1</option>
              <option value="2">Section2</option>
            </select>
            <div className="add__block-btn">
              <button
                disabled={!isFormValid}
                className={`${isFormValid === true ? "btn-truth" : ""}`}
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </form>
        <div className="exist">
          <button type="btn" onClick={props.hideAddBlockModal}>
            <i className="bi bi-x"></i>
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddBlockModal;
