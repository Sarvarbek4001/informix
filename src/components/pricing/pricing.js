import React, { useState, useEffect, useContext } from "react";
import LocalizationContext from "../../context/LocalizationContext";
import "./pricing.scss";
import Checkmark from "../checkmark/checkmark";
function Pricing() {
  const [data, setData] = useState([]);
  const ctx = useContext(LocalizationContext);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}/allPrices`);
      const json = await response.json();
      setData(json.allPrices);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section className="pricing" id="price">
      <div className="pricing__section container">
        {data.length &&
          data.map((item,index) => (
            <div className="pricing__section-card" key={index}>
              <div className="pricing__section__intro">
                <div className="pricing__section__intro-wrapper">
                  <p className="pricing__section__intro-text1">
                    {ctx.lang === "uz"
                      ? item.price_title_uz
                      : ctx.lang === "ru"
                      ? item.price_title_ru
                      : item.price_title_en}
                  </p>
                  <h3 className="pricing__section__intro-price">
                    {item.price_number}
                  </h3>
                  <p className="pricing__section__intro-text2">
                    {ctx.lang === "uz"
                      ? item.price_sub_title_uz
                      : ctx.lang === "ru"
                      ? item.price_sub_title_ru
                      : item.price_sub_title_en}
                  </p>
                </div>
              </div>
              <div className="pricing__section-information">
                <div className="pricing__section-items">
                  {ctx.lang === "uz"
                    ? item.chances.uz &&
                      item.chances.uz.map((program_option,index) => (
                        <div className="pricing__section-item" key={index}>
                          <Checkmark>
                            <i className="bi bi-check-circle-fill bi-green"></i>
                          </Checkmark>
                          <p className="pricing__section-paragraph">
                            {program_option}
                          </p>
                        </div>
                      ))
                    : ctx.lang === "ru"
                    ? item.chances.ru &&
                      item.chances.ru.map((program_option,index) => (
                        <div className="pricing__section-item" key={index}>
                          <Checkmark>
                            <i className="bi bi-check-circle-fill bi-green"></i>
                          </Checkmark>
                          <p className="pricing__section-paragraph">
                            {program_option}
                          </p>
                        </div>
                      ))
                    : item.chances.en &&
                      item.chances.en.map((program_option,index) => (
                        <div className="pricing__section-item" key={index}>
                          <Checkmark>
                            <i className="bi bi-check-circle-fill bi-green"></i>
                          </Checkmark>
                          <p className="pricing__section-paragraph">
                            {program_option}
                          </p>
                        </div>
                      ))}
                  {}
                  <a href="#" className="pricing__section-compare">
                    Compare plans
                  </a>
                </div>
                <div className="pricing__section-trial">
                  <a href="#">START FREE TRIAL</a>
                </div>
              </div>
            </div>
          ))}

        {/* <div className="pricing__section-card">
          <div className="pricing__section__intro">
            <div className="pricing__section__intro-wrapper">
              <p className="pricing__section__intro-text1">Custom</p>
              <p className="pricing__section__contact-text">
                Contact us for tailor-made offer
              </p>
            </div>
          </div>
          <div className="pricing__section-information">
            <div className="pricing__section-items">
              <div className="pricing__section-item">
                <Checkmark>
                  <i className="bi bi-check-circle-fill bi-green"></i>
                </Checkmark>
                <p className="pricing__section-paragraph">
                  All Expert features, plus…
                </p>
              </div>
              <div className="pricing__section-item">
                <Checkmark>
                  <i className="bi bi-check-circle-fill bi-green"></i>
                </Checkmark>
                <p className="pricing__section-paragraph">
                  All Expert features, plus…
                </p>
              </div>
              <div className="pricing__section-item">
                <Checkmark>
                  <i className="bi bi-check-circle-fill bi-green"></i>
                </Checkmark>
                <p className="pricing__section-paragraph">
                  Unlimited outbound calls (Flat rates)
                </p>
              </div>
              <div className="pricing__section-item">
                <Checkmark>
                  <i className="bi bi-check-circle-fill bi-green"></i>
                </Checkmark>
                <p className="pricing__section-paragraph">
                  Enterprise-level security
                </p>
              </div>
              <div className="pricing__section-item">
                <Checkmark>
                  <i className="bi bi-check-circle-fill bi-green"></i>
                </Checkmark>
                <p className="pricing__section-paragraph">Developer support</p>
              </div>
              <div className="pricing__section-item">
                <Checkmark>
                  <i className="bi bi-check-circle-fill bi-green"></i>
                </Checkmark>
                <p className="pricing__section-paragraph">Custom reporting</p>
              </div>
              <div className="pricing__section-item">
                <Checkmark>
                  <i className="bi bi-check-circle-fill bi-green"></i>
                </Checkmark>
                <p className="pricing__section-paragraph">SLA</p>
              </div>

              <a href="#" className="pricing__section-compare">
                Compare plans
              </a>
            </div>
            <div className="pricing__section-trial">
              <a href="#">START FREE TRIAL</a>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default Pricing;
