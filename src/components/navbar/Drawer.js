import React, { useRef, useState, useContext } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LocalizationContext from "../../context/LocalizationContext";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
const DrawerComp = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const langRef = useRef();
  const ctx = useContext(LocalizationContext);
  const handleSelectChange = (evt) => {
    ctx.setLang(evt.target.value);
  };
  return (
    <React.Fragment>
      <Drawer
        anchor="top"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            paddingTop: "30px",
            paddingBottom: "30px",
          }}
        >
          <ListItemButton sx={{ display: "inline-block", textAlign: "center" }}>
            <ListItemIcon>
              <a
                href="#"
                style={{
                  width: "100%",
                  textAlign: "center",
                  textDecoration: "none",
                  fontSize: "18px",
                  padding: "0 20px 0 20px",
                }}
              >
                {props.content[props.lang].navbar.home}
              </a>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton sx={{ display: "inline-block", textAlign: "center" }}>
            <ListItemIcon>
              <a
                href="#section1"
                style={{
                  textDecoration: "none",
                  fontSize: "18px",
                  padding: "0 20px 0 20px",
                }}
              >
                {props.content[props.lang].navbar.section1}
              </a>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton sx={{ display: "inline-block", textAlign: "center" }}>
            <ListItemIcon>
              <a
                href="#section2"
                style={{
                  textDecoration: "none",
                  fontSize: "18px",
                  padding: "0 20px 0 20px",
                }}
              >
                {props.content[props.lang].navbar.section2}
              </a>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton sx={{ display: "inline-block", textAlign: "center" }}>
            <ListItemIcon>
              <a
                href="#price"
                style={{
                  textDecoration: "none",
                  fontSize: "18px",
                  padding: "0 20px 0 20px",
                }}
              >
                {props.content[props.lang].navbar.price}
              </a>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton sx={{ display: "inline-block", textAlign: "center" }}>
            <ListItemIcon>
              <a
                href="#contactus"
                style={{
                  textDecoration: "none",
                  fontSize: "18px",
                  padding: "0 20px 0 20px",
                }}
              >
                {props.content[props.lang].navbar.contact}
              </a>
            </ListItemIcon>
          </ListItemButton>
        </List>
        <select
          ref={langRef}
          className="language__select"
          onChange={handleSelectChange}
          style={{ marginBottom: "5px" }}
        >
          <option value="uz">UZ</option>
          <option value="ru">RU</option>
          <option value="en">EN</option>
        </select>
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "20px",
            padding: "8px 8px 5px 8px",
            backgroundColor: "#ffffff",
            border: "1px solid rgb(34,45,50)",
            borderRadius: "4px",
          }}
          onClick={() => setOpenDrawer(!openDrawer)}
        >
          <CloseIcon fontSize="large" />
        </button>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" sx={{ fontSize: 25 }} />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
