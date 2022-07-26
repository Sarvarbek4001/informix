import React, { useState } from "react";

const BlockContext = React.createContext();

export const BlockContextProvider = (props) => {
  const [data, setData] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const showModal = () => {
    setIsVisibleModal(true);
  };
  const hideModal = () => {
    setIsVisibleModal(false);
  };
  const getSingleBlockSection = async (blockId) => {
    try {
      const url = `${process.env.REACT_APP_HOST}/block/single/${blockId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: { authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` },
      });
      if (response.ok) {
        const json = await response.json();
        setData(json.singleBlock);
        showModal();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <BlockContext.Provider
      value={{
        data: data,
        isVisibleModal: isVisibleModal,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
        showModal: showModal,
        hideModal: hideModal,
        getSingleBlockSection: getSingleBlockSection,
      }}
    >
      {props.children}
    </BlockContext.Provider>
  );
};

export default BlockContext;
