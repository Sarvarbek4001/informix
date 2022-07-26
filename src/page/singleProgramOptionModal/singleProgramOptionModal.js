import React, { useState, useEffect } from "react";
import Modal from "../modal/modal";
import "./singleProgramOptionModal.scss";
import SendIcon from "@mui/icons-material/Send";
function SingleProgramOptionModal(props) {
  const [inputOptionTitleUz, setInputOptionTitleUz] = useState(
    props.programOptionsData.chance_title_uz
  );
  const [inputOptionTitleRu, setInputOptionTitleRu] = useState(
    props.programOptionsData.chance_title_ru
  );
  const [inputOptionTitleEn, setInputOptionTitleEn] = useState(
    props.programOptionsData.chance_title_en
  );
  const [isFormValid, setIsFormValid] = useState(false);

  const changeInputOptionHandlerUz = (evt) => {
    setInputOptionTitleUz(evt.target.value);
  };
  const changeInputOptionHandlerRu = (evt) => {
    setInputOptionTitleRu(evt.target.value);
  };
  const changeInputOptionHandlerEn = (evt) => {
    setInputOptionTitleEn(evt.target.value);
  };
  useEffect(() => {
    if (
      inputOptionTitleUz.trim().length !==
        props.programOptionsData.chance_title_uz.trim().length ||
      inputOptionTitleRu.trim().length !==
        props.programOptionsData.chance_title_ru.trim().length ||
      inputOptionTitleEn.trim().length !==
        props.programOptionsData.chance_title_en.trim().length
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [inputOptionTitleUz, inputOptionTitleRu, inputOptionTitleEn]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (isFormValid) {
      props.setIsProgramOptionLoading(true);
      const response = await fetch(`${process.env.REACT_APP_HOST}/chance`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({
          chanceTitleUz: inputOptionTitleUz,
          chanceTitleRu: inputOptionTitleRu,
          chanceTitleEn: inputOptionTitleEn,
          chanceId: props.programOptionsData.chance_id,
        }),
      });
      if (response.ok) {
        props.hideProgramOptionModal();
        props.setIsProgramOptionLoading(false);
      }
    }
  };
  return (
    <Modal onHideCart={props.hideProgramOptionModal}>
      <div className="s_p_options">
        <form onSubmit={handleSubmit}>
          <div className="s_p_options-control">
            <input
              type="text"
              defaultValue={props.programOptionsData.chance_title_uz}
              onChange={changeInputOptionHandlerUz}
            />
          </div>
          <div className="s_p_options-control">
            <input
              type="text"
              defaultValue={props.programOptionsData.chance_title_ru}
              onChange={changeInputOptionHandlerRu}
            />
          </div>
          <div className="s_p_options-control">
            <input
              type="text"
              defaultValue={props.programOptionsData.chance_title_en}
              onChange={changeInputOptionHandlerEn}
            />
          </div>
          <div className="s_p_option--send-btn">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`${
                isFormValid === true ? "s_p_option_btn-hover" : null
              }`}
            >
              Save
              <SendIcon fontSize="large" sx={{ marginLeft: "5px" }} />
            </button>
          </div>
        </form>
      </div>
      <div className="exist">
        <button type="btn" onClick={props.hideProgramOptionModal}>
          <i className="bi bi-x"></i>
        </button>
      </div>
    </Modal>
  );
}

export default SingleProgramOptionModal;
