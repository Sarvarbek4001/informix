import React, { useState, useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import swal from "sweetalert";
import "./programOptions.scss";
function ProgramOptions(props) {
  const priceRef = useRef();
  const [data, setData] = useState([]);
  const [programOptions, setProgramOptions] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}/price`);
      if (response.ok) {
        const json = await response.json();
        setData(json.allPrices);
        handleClick();
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleClick = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/chance/${priceRef.current.value}`
      );
      if (response.ok) {
        const json = await response.json();
        setProgramOptions(json.getPriceChances);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const removeHandler = async (id) => {
    try {
      props.setIsProgramOptionLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/chance/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      if (response.ok) {
        props.setIsProgramOptionLoading(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    if (!props.isProgramOptionLoading) {
      fetchData();
    }
  }, [props.isProgramOptionLoading]);
  return (
    <div className="programm__options">
      <div className="banner__add-items">
        <select ref={priceRef} className="banner__add-select">
          {data.length > 0 &&
            data.map((item) => (
              <option value={item.price_id} key={item.price_id}>
                {item.price_title_en}
              </option>
            ))}
        </select>
        <button className="banner__add-btn" onClick={handleClick}>
          Send
          <SendIcon fontSize="large" sx={{ marginLeft: "5px" }} />
        </button>
        <button
          className="banner__add-btn"
          onClick={props.showAddProgramOptionModal}
        >
          <PostAddIcon fontSize="large" sx={{ marginRight: "5px" }} />
          Add
        </button>
      </div>
      {programOptions.length > 0 && (
        <div className="program__options--lists">
          {programOptions.length > 0 &&
            programOptions.map((item) => (
              <div className="program__options--list" key={item.chance_id}>
                <p>
                  <CheckCircleIcon
                    fontSize="large"
                    sx={{ marginRight: "5px" }}
                  />
                  {item.chance_title_en}
                </p>
                <div className="program__options--wrapper-btn">
                  <button
                    className="program__options-update-btn"
                    onClick={() => props.singleProgramOption(item)}
                  >
                    <EditIcon fontSize="large" />
                  </button>
                  <button
                    className="program__options-delete-btn"
                    onClick={async () => {
                      const responseReceived = await swal({
                        text: "Are you sure,you want to remove this program option?",
                        icon: "warning",
                        buttons: {
                          cancel: true,
                          confirm: true,
                        },
                      });
                      if (responseReceived) {
                        removeHandler(item.chance_id);
                      }
                    }}
                  >
                    <DeleteIcon fontSize="large" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default ProgramOptions;
