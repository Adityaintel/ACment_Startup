import React from "react";
import "./css/Header.css";
import alt_profile from "./images/icons/profile_alt_icon.svg";
import logo from "./images/homepage_illustrations/Acment_logo.png";
import "font-awesome/css/font-awesome.min.css";

function Header({ toggleUserInfo }) {
  return (
    <div className="header">
      <div className="header__fullLogo">
        <div className="header__logo">
          <img src={logo} alt="" />
        </div>
        <h2>Acment</h2>
      </div>
      <div className="header__middle">
        <div className="header__searchBar">
          <input type="text" name="searchBar" />
          <button>
            <i className="fa fa-search "></i>
          </button>
        </div>
      </div>

      <div className="header__profile" onClick={toggleUserInfo}>
        <img src={alt_profile} alt="" />
      </div>
    </div>
  );
}

export default Header;
