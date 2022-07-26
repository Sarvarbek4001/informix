import React, { useState, useEffect } from "react";
import "./brandImageAdd.scss";
import swal from "sweetalert";
function BrandImageAdd(props) {

  const [isFirstRenderBrand, setIsFirstRenderBrand] = useState(true);
  const [imageId, setImageId] = useState([]);
  useEffect(() => {
    const url = `${process.env.REACT_APP_HOST}/brandImageId`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setImageId(json.brandImageId);
      } catch (error) {
        console.log("error", error);
      }
    };
    if (props.isImageLoading || isFirstRenderBrand) {
      fetchData();
      setIsFirstRenderBrand(false);
    }
  }, [props.isImageLoading]);
  const removeBrandHandler = async (id) => {
    props.setIsImageLoading(false);
    const deletedBrandResponse = await fetch(
      `${process.env.REACT_APP_HOST}/brand/${id}`,
      {
        method: "DELETE",
        headers: { authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` },
      }
    );
    if (deletedBrandResponse.ok) {
      props.setIsImageLoading(true);
    }
  };
  return (
    <>
      <div className="add__brand--header">
        <button
          className="add__brand--header-btn"
          onClick={props.onShowModalAdd}
        >
          <i className="bi bi-plus-circle-dotted"></i>Add brand image
        </button>
      </div>
      <div className="section__brand-items">
        {imageId &&
          imageId.map((id) => (
            <div className="section__brand-item" key={id.id}>
              <img
                className="brand--image"
                src={`${process.env.REACT_APP_HOST}/brand/${id.id}`}
              />
              <button
                className="brand__delete-img"
                onClick={async () => {
                  const responseReceived = await swal({
                    text: "Are you sure,you want to remove this block image?",
                    icon: "warning",
                    buttons: {
                      cancel: true,
                      confirm: true,
                    },
                  });
                  if (responseReceived) {
                    removeBrandHandler(id.id);
                  }
                }}
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </div>
          ))}
      </div>
    </>
  );
}

export default BrandImageAdd;
