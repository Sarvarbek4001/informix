import React, { useEffect, useState } from "react";
import "./pricingAddPage.scss";
import swal from "sweetalert";
function PricingAddPage(props) {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}/price`);
      const json = await response.json();
      setData(json.allPrices);
    } catch (error) {
      console.log("error", error);
    }
  };
  const removeHandler = async (id) => {
    try {
      props.setIsLoading(true);
      const reply = await fetch(`${process.env.REACT_APP_HOST}/price/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      if (reply.ok) {
        props.setIsLoading(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    if (!props.isLoading) {
      fetchData();
    }
  }, [props.isLoading]);

  return (
    <div className="pricing__add--page">
      <div className="banner__add-items">
        <button
          className="banner__add-btn"
          onClick={() => props.showAddPriceModal()}
        >
          <i className="bi bi-plus-circle-dotted"></i>Add new price
        </button>
      </div>

      <div className="pricing__add-items">
        {data.length > 0 &&
          data.map((item) => (
            <div className="pricing__add-item" key={item.price_id}>
              <p className="pricing__add-item-title">{item.price_title_en}</p>
              <h3 className="pricing__add-item-number">{item.price_number}</h3>
              <p className="pricing__add-item-subtitle">
                {item.price_sub_title_en}
              </p>
              <button
                className="pricing__update-btn"
                onClick={() => {
                  props.singlePrice(item);
                }}
              >
                <i className="bi bi-pencil-square"></i>
              </button>
              <button
                className="pricing__delete-btn"
                onClick={async () => {
                  const responseReceived = await swal({
                    text: "Are you sure,you want to remove this price ?",
                    icon: "warning",
                    buttons: {
                      cancel: true,
                      confirm: true,
                    },
                  });
                  if (responseReceived) {
                    removeHandler(item.price_id);
                  }
                }}
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PricingAddPage;
