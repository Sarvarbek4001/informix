import React, { useRef, useState, useEffect, useContext } from "react";
import "./blockAddPage.scss";
import BlockSectionCard from "../blockSectionCard/blockSectionCard";
import BlockContext from "../../context/SingleBlock";
function BlockAddPage(props) {
  const ctx = useContext(BlockContext);
  const sectionId = useRef(1);
  const [data, setData] = useState([]);
  const getBlockSectionHandler = async () => {
    try {
      const url = `${process.env.REACT_APP_HOST}/block/${sectionId.current.value}`;
      const response = await fetch(url, {
        method: "GET",
        headers: { authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}` },
      });
      if (response.ok) {
        const json = await response.json();
        setData(json.block_section);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    if (!ctx.isLoading) {
      getBlockSectionHandler();
    }
  }, [ctx.isLoading]);
  return (
    <div className="block__contain">
      <div className="block__add-wrapper">
        <select className="block__add-select" ref={sectionId}>
          <option value="1">Section1</option>
          <option value="2">Section2</option>
        </select>
        <button className="block__add-btn" onClick={getBlockSectionHandler}>
          Send
        </button>
        <button className="block__add-btn" onClick={props.showAddBlockModal}>
          <i className="bi bi-plus-circle-dotted"></i>Add new block
        </button>
      </div>
      <div className="block__section-intro">
        <div className="block__section-cards">
          <BlockSectionCard
            data={data}
            showImageUploadBlockModal={props.showImageUploadBlockModal}
            setImageId={props.setImageId}
          />
        </div>
      </div>
    </div>
  );
}

export default BlockAddPage;
