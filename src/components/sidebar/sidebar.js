import React, { useState, useContext } from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo/ULogo.png";
function Sidebar() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="sidebar">
      {/* <h1 className="sidebar__heading">Call Center</h1> */}
      <div style={{ marginBottom: "10px" }}>
        <img src={Logo} />
      </div>
      <nav className="sidebar__items">
        <ul className="sidebar__lists">
          <li className="sidebar__list">
            <Link to="customer" className="sidebar__list-item">
              <i className="bi bi-person-check-fill"></i> Customers
            </Link>
          </li>
          <li className="sidebar__list">
            <div>
              <div
                className="sidebar__list-item"
                onClick={() => setIsVisible(!isVisible)}
              >
                <i className="bi bi-gear"></i> Settings
                {isVisible === false ? (
                  <i className="bi bi-chevron-right"></i>
                ) : (
                  <i className="bi bi-chevron-down"></i>
                )}
              </div>
              {isVisible && (
                <div className="settings settings__animation">
                  <Link to="block" className="settings__item ">
                    <i className="bi bi-plus-circle"></i>Block
                  </Link>
                  <Link to="banner" className="settings__item">
                    <i className="bi bi-plus-circle"></i>Banner
                  </Link>
                  <Link to="brandImage" className="settings__item">
                    <i className="bi bi-plus-circle"></i>Brand Image
                  </Link>
                  <Link to="price" className="settings__item">
                    <i className="bi bi-plus-circle"></i>Prices
                  </Link>
                  <Link to="opportunities" className="settings__item">
                    <i className="bi bi-plus-circle"></i>Program Options
                  </Link>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
