import React, { useContext } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import BlockContext from "../../context/SingleBlock";
import swal from "sweetalert";
import "./blockSectionCard.scss";
function BlockSectionCard(props) {
  const ctx = useContext(BlockContext);
  const deleteHandler = async (id) => {
    try {
      ctx.setIsLoading(true);
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({
          blockId: id,
        }),
      };
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/block`,
        requestOptions
      );
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        ctx.setIsLoading(false);
      } else {
        console.log("Error");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      {props.data &&
        props.data.map((item, index) => (
          <div className="block__section-card" key={index}>
            <h3 className="block__card-heading">{item.title_en}</h3>
            <p className="block__card-text">{item.content_en}</p>
            <div className="row__rewerse">
              <FormControlLabel
                label={
                  <Typography
                    variant="h4"
                    style={{
                      color: "black",
                      fontSize: 16,
                    }}
                  >
                    Row-rewerse
                  </Typography>
                }
                control={
                  <Checkbox
                    checked={item.b_row_reverse}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 18,
                        color: "#000051",
                      },
                    }}
                  />
                }
              />
            </div>
            <button className="block__card--button" type="button">
              {item.btn_text_en}
            </button>
            <div className="block__card-btns">
              <button
                className="block__card-imageupload"
                onClick={() => {
                  props.setImageId(item.block_id);
                  props.showImageUploadBlockModal();
                }}
              >
                <i className="bi bi-image"></i>
              </button>
              <button
                className="block__card-update"
                onClick={() => ctx.getSingleBlockSection(item.block_id)}
              >
                <i className="bi bi-pencil-square btn-square"></i>
              </button>
              <button
                className="block__card-delete"
                onClick={async () => {
                  const responseReceived = await swal({
                    text: "Are you sure,you want to remove this block ?",
                    icon: "warning",
                    buttons: {
                      cancel: true,
                      confirm: true,
                    },
                  });
                  if (responseReceived) {
                    deleteHandler(item.block_id);
                  }
                }}
              >
                <i className="bi bi-trash-fill btn-trash-fill"></i>
              </button>
            </div>
          </div>
        ))}
    </>
  );
}

export default BlockSectionCard;
