import React, { useContext } from "react";
import LocalizationContext from "../../context/LocalizationContext";
import "./block.scss";
import Button from "../button/button";
import Checkmark from "../checkmark/checkmark";
function Block(props) {
  const ctx = useContext(LocalizationContext);
  return (
    <>
      {props.block.map((item, index) => (
        <section className="block" key={index} id={props.id}>
          <div
            className={`block__section container ${
              item.b_row_reverse === true ? "flex-direction" : null
            }`}
          >
            <div className="block__section-img ">
              <img
                src={`${process.env.REACT_APP_HOST}/blockImage/${item.block_id}`}
                width={594}
              />
            </div>
            <div className="block__section-items ">
              <h3 className="block__section-heading">
                {ctx.lang === "uz"
                  ? item.title_uz
                  : ctx.lang === "ru"
                  ? item.title_ru
                  : item.title_en}
              </h3>
              <p className="block__section-text">
                {ctx.lang === "uz"
                  ? item.content_uz
                  : ctx.lang === "ru"
                  ? item.content_ru
                  : item.content_en}
              </p>
              <div className="block__section-btn">
                <Button type="button">
                  {ctx.lang === "uz"
                    ? item.btn_text_uz
                    : ctx.lang === "ru"
                    ? item.btn_text_ru
                    : item.btn_text_en}
                </Button>
              </div>
              <Checkmark>
                <i className="bi bi-check2"></i>{props.content[props.lang].aboutPayment}
              </Checkmark>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

export default Block;
