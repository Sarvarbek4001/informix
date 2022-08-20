import React from "react";
import "./Order.scss";
import Form from "../form/Form";
import Checkmark from "../checkmark/checkmark";

function Order(props) {
  return (
    <div name="home" className="order">
      <div className="order__section container">
        <div className="order__items animation1">
          <h1 className="order__heading ">
            {props.content[props.lang].block.heading}
          </h1>
          <p className="order__paragraph">
            {props.content[props.lang].block.subTitle}
          </p>
          <Checkmark>
            <i className="bi bi-check2"></i>{props.content[props.lang].aboutPayment}
          </Checkmark>
        </div>
        <div className="form__section ">
          <Form lang={props.lang} content={props.content} />
        </div>
      </div>
    </div>
  );
}

export default Order;
