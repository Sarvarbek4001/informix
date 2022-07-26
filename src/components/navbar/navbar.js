import React, { useRef, useContext } from "react";
import { AppBar, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import DrawerComp from "./Drawer";
import Logo from "../../assets/logo/ULogo.png";
import "./navbar.scss";
import LocalizationContext from "../../context/LocalizationContext";
const Header = (props) => {
  const ctx = useContext(LocalizationContext);
  const langRef = useRef();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const handleSelectChange = (evt) => {
    ctx.setLang(evt.target.value);
  };
  return (
    <React.Fragment>
      <AppBar sx={{ background: "rgb(34,45,50)" }}>
        <div>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              maxWidth: "1280px",
              margin: "0 auto",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            <div>
              <img src={Logo} />
            </div>
            {isMatch ? (
              <>
                <DrawerComp lang={props.lang} content={props.content} />
              </>
            ) : (
              <>
                <ul className="header__list">
                  <li className="header__item">
                    <a
                      className="header__link"
                      href="/"
                      style={{
                        textDecoration: "none",
                        fontSize: "18px",
                      }}
                    >
                      {props.content[props.lang].navbar.home}
                    </a>
                  </li>
                  <li className="header__item">
                    <a
                      className="header__link"
                      href="#section1"
                      style={{
                        textDecoration: "none",
                        fontSize: "18px",
                      }}
                    >
                      {props.content[props.lang].navbar.section1}
                    </a>
                  </li>
                  <li className="header__item">
                    <a
                      className="header__link"
                      href="#section2"
                      style={{
                        textDecoration: "none",
                        fontSize: "18px",
                      }}
                    >
                      {props.content[props.lang].navbar.section2}
                    </a>
                  </li>
                  <li className="header__item">
                    <a
                      className="header__link"
                      href="#price"
                      style={{
                        textDecoration: "none",
                        fontSize: "18px",
                      }}
                    >
                      {props.content[props.lang].navbar.price}
                    </a>
                  </li>
                  <li className="header__item">
                    <a
                      className="header__link"
                      href="#contactus"
                      style={{
                        textDecoration: "none",
                        fontSize: "18px",
                      }}
                    >
                      {props.content[props.lang].navbar.contact}
                    </a>
                  </li>
                </ul>
                <select
                  ref={langRef}
                  className="language__select"
                  onChange={handleSelectChange}
                >
                  <option value="uz">UZ</option>
                  <option value="ru">RU</option>
                  <option value="en">EN</option>
                </select>
              </>
            )}
          </Toolbar>
        </div>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
