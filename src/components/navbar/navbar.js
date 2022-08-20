import React, { useRef, useContext } from "react";
import { AppBar, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import DrawerComp from "./Drawer";
import { Link, animateScroll as scroll } from "react-scroll";
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
      <AppBar sx={{ background: "#2196F3" }} >
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
                      <Link
                          to="home"
                          smooth={true}
                          offset={0}
                          duration={500}
                          className="header__link "
                      >
                          {props.content[props.lang].navbar.home}
                      </Link>
                  </li>
                  <li className="header__item">
                      <Link
                          to="features"
                          smooth={true}
                          offset={0}
                          duration={500}
                          className="header__link "
                      >
                          {props.content[props.lang].navbar.section1}
                      </Link>
                  </li>
                  <li className="header__item">
                      <Link
                          to="services"
                          smooth={true}
                          offset={0}
                          duration={500}
                          className="header__link "
                      >
                          {props.content[props.lang].navbar.section2}
                      </Link>
                  </li>
                  <li className="header__item">
                      <Link
                          to="prices"
                          smooth={true}
                          offset={0}
                          duration={500}
                          className="header__link "
                      >
                          {props.content[props.lang].navbar.price}
                      </Link>
                  </li>
                  <li className="header__item">
                      <Link
                          to="contactus"
                          smooth={true}
                          offset={0}
                          duration={500}
                          className="header__link "
                      >
                          {props.content[props.lang].navbar.contact}
                      </Link>
                  </li>
                </ul>
                <select
                  ref={langRef}
                  className="language__select"
                  onChange={handleSelectChange}
                  defaultValue={ctx.lang}
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
