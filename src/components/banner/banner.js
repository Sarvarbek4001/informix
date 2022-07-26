import React, { useContext } from "react";
import LocalizationContext from "../../context/LocalizationContext";
import "./banner.scss";
import Checkmark from "../checkmark/checkmark";
function Banner(props) {
  const ctx = useContext(LocalizationContext);
  return (
    <section className="banner">
      <div className="banner__section container">
        {props.banner &&
          props.banner.map((item, index) => (
            <div className="banner__items" key={index}>
              <Checkmark>
                <i className="bi bi-check-circle-fill"></i>
              </Checkmark>
              <p className="banner__text">
                {ctx.lang === "uz"
                  ? item.banner_title_uz
                  : ctx.lang === "ru"
                  ? item.banner_title_ru
                  : item.banner_title_en}
              </p>
            </div>
          ))}
      </div>
    </section>
  );
}

export default Banner;
