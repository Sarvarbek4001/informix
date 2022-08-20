import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./brand.scss";



function Brand() {
  const [brandId, setBrandId] = useState([]);

  const getBrandImage = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/brandImageId`
      );
      if (response.ok) {
        const json = await response.json();
        setBrandId(json.brandImageId);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getBrandImage();
  }, []);
  const renderSlides = () =>
    brandId.map((num, index) => (
      <div className="wrapper" key={index}>
        <div className="brand__section-item">
          <img
            className="brand__image"
            src={`${process.env.REACT_APP_HOST}/brand/${num.id}`}
          />
        </div>
      </div>
    ));
  let settings = {
    className: "center",
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <section className="brand">
      <div className="brand__section container">
        <Slider {...settings}>{renderSlides()}</Slider>
      </div>
    </section>
  );
}

export default Brand;
