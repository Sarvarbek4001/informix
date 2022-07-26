import React from "react";
import "./checkmark.scss";
function Checkmark(props) {
  return <span className="text-span">{props.children}</span>;
}

export default Checkmark;
