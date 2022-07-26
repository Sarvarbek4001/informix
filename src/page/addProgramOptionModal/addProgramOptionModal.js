import React, { useEffect, useState, useRef } from "react";
import "./addProgramOptionModal.scss";
import Modal from "../modal/modal";
import SendIcon from "@mui/icons-material/Send";
const AddProgramOptionModal = (props) => {
  const [data, setData] = useState([]);
  const [inputTitleUz, setInputTitleUz] = useState("");
  const [inputTitleRu, setInputTitleRu] = useState("");
  const [inputTitleEn, setInputTitleEn] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const priceRef = useRef();

  const titleChangeHandlerUz = (evt) => {
    setInputTitleUz(evt.target.value);
  };
  const titleChangeHandlerRu = (evt) => {
    setInputTitleRu(evt.target.value);
  };
  const titleChangeHandlerEn = (evt) => {
    setInputTitleEn(evt.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}/price`);
      if (response.ok) {
        const json = await response.json();
        setData(json.allPrices);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (inputTitleUz !== "" && inputTitleRu !== "" && inputTitleEn !== "") {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [inputTitleUz, inputTitleRu, inputTitleEn]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (isFormValid) {
      props.setIsProgramOptionLoading(true);
      const response = await fetch(`${process.env.REACT_APP_HOST}/chance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({
          chanceTitleUz: inputTitleUz,
          chanceTitleRu: inputTitleRu,
          chanceTitleEn: inputTitleEn,
          priceId: priceRef.current.value,
        }),
      });
      if (response.ok) {
        props.hideAddProgramOptionModal();
        props.setIsProgramOptionLoading(false);
      }
    }
  };
  return (
    <Modal onHideCart={props.hideAddProgramOptionModal}>
      <div className="add__program__option">
        <form onSubmit={handleSubmit}>
          <div className="add__program__option-control">
            <input
              type="text"
              placeholder="Dastur parametr nomi"
              onChange={titleChangeHandlerUz}
            />
          </div>
          <div className="add__program__option-control">
            <input
              type="text"
              placeholder="Имя параметра программы"
              onChange={titleChangeHandlerRu}
            />
          </div>
          <div className="add__program__option-control">
            <input
              type="text"
              placeholder="Program parameter name"
              onChange={titleChangeHandlerEn}
            />
          </div>

          <div className="add__program--send-btn">
            <div className="add__program__option-control">
              <select ref={priceRef}>
                {data.length > 0 &&
                  data.map((item) => (
                    <option value={item.price_id} key={item.price_id}>
                      {item.price_title_en}
                    </option>
                  ))}
              </select>
            </div>
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
      </div>
      <div className="exist">
        <button type="btn" onClick={props.hideAddProgramOptionModal}>
          <i className="bi bi-x"></i>
        </button>
      </div>
    </Modal>
  );
};

export default AddProgramOptionModal;
