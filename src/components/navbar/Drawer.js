import React, { useRef, useState, useContext } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, animateScroll as scroll } from "react-scroll";
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
          <ListItemButton sx={{ display: "inline-block", textAlign: "center",fontSize:'18px' }}>
            <ListItemIcon>
                <Link
                    to="home"
                    smooth={true}
                    offset={0}
                    duration={500}
                    className="header__link "
                >
                    {props.content[props.lang].navbar.home}
                </Link>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton sx={{ display: "inline-block", textAlign: "center",fontSize:'18px' }}>
            <ListItemIcon>
                <Link
                    to="features"
                    smooth={true}
                    offset={0}
                    duration={500}
                    className="header__link "
                >
                    {props.content[props.lang].navbar.section1}
                </Link>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton sx={{ display: "inline-block", textAlign: "center",fontSize:'18px' }}>
            <ListItemIcon>
                <Link
                    to="services"
                    smooth={true}
                    offset={0}
                    duration={500}
                    className="header__link "
                >
                    {props.content[props.lang].navbar.section2}
                </Link>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton sx={{ display: "inline-block", textAlign: "center",fontSize:'18px' }}>
            <ListItemIcon>
                <Link
                    to="prices"
                    smooth={true}
                    offset={0}
                    duration={500}
                    className="header__link "
                >
                    {props.content[props.lang].navbar.price}
                </Link>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton sx={{ display: "inline-block", textAlign: "center",fontSize:'18px' }}>
            <ListItemIcon>
                <Link
                    to="contactus"
                    smooth={true}
                    offset={0}
                    duration={500}
                    className="header__link "
                >
                    {props.content[props.lang].navbar.contact}
                </Link>
            </ListItemIcon>
          </ListItemButton>
        </List>
        <select
          ref={langRef}
          className="language__select"
          onChange={handleSelectChange}
          style={{ marginBottom: "5px",textAlign:'center',backgroundColor:"#2196F3",color:'white' }}
        >
          <option value="uz">UZ</option>
          <option value="ru">RU</option>
          <option value="en">EN</option>
        </select>
        <button
          style={{
            position: "absolute",
            top: "5px",
            right: "20px",
            backgroundColor: "#ffffff",
              border:"none",
              cursor:'pointer',

          }}
          onClick={() => setOpenDrawer(!openDrawer)}
        >
          <CloseIcon sx={{fontSize: 30}} />
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
