import React, { useState, useEffect, useContext } from "react";
import Order from "../components/order/Order";
import Block from "../components/block/block";
import Banner from "../components/banner/banner";
import Pricing from "../components/pricing/pricing";
import Brand from "../components/brand/brand";
import Contact from "../components/contact/contact";
import Header from "../components/navbar/navbar";
import LocalizationContext from "../context/LocalizationContext";
import Content from "../components/Content/Content";
function LandingPage() {
  const [block1, setBlock1] = useState([]);
  const [banner1, setBanner1] = useState([]);
  const [block2, setBlock2] = useState([]);
  const [banner2, setBanner2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { lang } = useContext(LocalizationContext);
  const getBlockSectionFirst = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/section/${id}`
      );
      if (response.ok) {
        const json = await response.json();
        setBlock1(json.blocks);
        setBanner1(json.bannerTitle);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getBlockSectionSecond = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/section/${id}`
      );
      if (response.ok) {
        const json = await response.json();
        setBlock2(json.blocks);
        setBanner2(json.bannerTitle);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getBlockSectionFirst(1);
    getBlockSectionSecond(2);
  }, []);
  return (
    <>
      {isLoading === true ? (
        <div className="loading">
          <div className="spinner">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
            <div className="bar4"></div>
            <div className="bar5"></div>
            <div className="bar6"></div>
            <div className="bar7"></div>
            <div className="bar8"></div>
            <div className="bar9"></div>
            <div className="bar10"></div>
            <div className="bar11"></div>
            <div className="bar12"></div>
          </div>
        </div>
      ) : (
        <div>
          <Header lang={lang} content={Content} />
          <Order lang={lang} content={Content} />
          <Block block={block1} lang={lang} content={Content} id="section1" />
          <Banner banner={banner1} />
          <Block block={block2} lang={lang} content={Content} id="section2" />
          <Banner banner={banner2} />
          <Brand />
          <Pricing />
          <Contact lang={lang} content={Content} />
        </div>
      )}
    </>
  );
}

export default LandingPage;
