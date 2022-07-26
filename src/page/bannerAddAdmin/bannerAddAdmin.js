import React, { useRef, useState, useEffect } from "react";
import "./bannerAddAdmin.scss";
import swal from "sweetalert";
function BannerAddAdmin(props) {
  const [firstRender, setFirstRender] = useState(true);
  const sectionRef = useRef(null);
  const [data, setData] = useState([]);
  const sectionBannerHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/banner/${sectionRef.current.value}`
      );
      const reply = await response.json();
      setData(reply);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    if (!props.isLoading || firstRender) {
      sectionBannerHandler();
      setFirstRender(false);
    } else {
      setFirstRender(false);
    }
  }, [props.isLoading]);
  const deleteBannerHandler = async (bannerId) => {
    try {
      props.setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/banner/${bannerId}`,
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
        props.setIsLoading(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="banner__add">
      <div className="banner__add-items">
        <select ref={sectionRef} className="banner__add-select">
          <option value="1">Section1</option>
          <option value="2">Section2</option>
        </select>
        <button className="banner__add-btn" onClick={sectionBannerHandler}>
          Send
        </button>
        <button className="banner__add-btn" onClick={props.showAddBanner}>
          <i className="bi bi-plus-circle-dotted"></i>Add new banner
        </button>
      </div>
      <div className="banner__table">
        {data &&
          data.map((item, index) => (
            <div className="banner__item" key={index}>
              <div className="banner__title">
                <span className="banner__title--num">{index + 1}</span>
                <p className="banner__title--text">{item.banner_title_en}</p>
              </div>
              <div className="banner__button--items">
                <button
                  className="banner__button-update"
                  onClick={() => props.updateBannerHandler(item)}
                >
                  <i className="bi bi-pen"></i>
                </button>
                <button
                  className="banner__button-delete"
                  onClick={async () => {
                    const responseReceived = await swal({
                      text: "Are you sure,you want to remove this banner?",
                      icon: "warning",
                      buttons: {
                        cancel: true,
                        confirm: true,
                      },
                    });
                    if (responseReceived) {
                      deleteBannerHandler(item.banner_id);
                    }
                  }}
                >
                  <i className="bi bi-trash bi-black"></i>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default BannerAddAdmin;
