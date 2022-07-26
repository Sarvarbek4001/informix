import React, { useState } from "react";
import Modal from "../../page/modal/modal";
import ProfilImage from "../../assets/images/user.png";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import "./customer.scss";

function Customer(props) {
  const [isChecked, setIsChecked] = useState(false);
  const checkboxHandler = (evt) => {
    setIsChecked(evt.target.checked);
  };
  const updateHandler = async (event) => {
    event.preventDefault();
    props.setIsLoading(true);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      body: JSON.stringify({
        is_connected: isChecked,
        user_id: props.user.user_id,
      }),
    };
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/users`,
      requestOptions
    );
    if (response.ok) {
      props.setIsLoading(false);
      props.onHideCart();
    }
  };
  return (
    <Modal onHideCart={props.onHideCart}>
      <div className="profil__section">
        <div>
          <img
            // src="https://icon-library.com/images/icon-of-person/icon-of-person-6.jpg"
            src="https://www.4read.net/uploads/userlogo.png"
            className="profil__image"
            width={200}
          />
          <h1 className="f__name-title">
            <span>{props.user.first_name}</span>
          </h1>
          <h1 className="l__name-title"> {props.user.last_name}</h1>
        </div>
        <div>
          <h2 className="email__name-title">
            <i className="bi bi-envelope-fill"></i>
            {props.user.user_email}
          </h2>

          <h2 className="number__name-title">
            <i className="bi bi-telephone-fill"></i>+{props.user.phone_number}
          </h2>
          <div className="is--connected">
            <i className="bi bi-telephone-plus-fill"></i>
            <FormControlLabel
              label={
                <Typography
                  variant="h4"
                  style={{
                    color: "black",
                    fontSize: 16,
                    letterSpacing: "1px",
                    // fontFamily: "Brush Script MT , cursive",
                  }}
                >
                  Connected
                </Typography>
              }
              control={
                <Checkbox
                  defaultChecked={props.user.is_connected}
                  onChange={checkboxHandler}
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: 23,
                      color: "#000051",
                    },
                  }}
                />
              }
            />
          </div>
        </div>
      </div>
      <div className="btn__items-modal">
        <button className="btn__close" onClick={props.onHideCart}>
          Close
        </button>
        <button
          className={`btn__save ${
            isChecked === true ? "btn_save--opacity" : ""
          }`}
          disabled={!isChecked}
          onClick={updateHandler}
        >
          Save
        </button>
      </div>
    </Modal>
  );
}

export default Customer;
