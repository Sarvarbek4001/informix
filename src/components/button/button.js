import React from "react";
import "./button.scss";
function Button(props) {
  return (
    <button className="btn__orange" type={props.type}>
      {props.children}
    </button>
  );
}

export default Button;
