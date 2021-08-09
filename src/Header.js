import React from "react";
import "./css/Header.css";
import alt_profile from "./images/icons/profile_alt_icon.svg";
import logo from "./images/homepage_illustrations/Acment_logo.png";
import "font-awesome/css/font-awesome.min.css";
import UserContextProvider from "./UserContext";
import axios from "axios";

const searchapi = process.env.REACT_APP_BASE_URL + "/mentor/search";
const baseUrl = process.env.REACT_APP_BASE_URL;

function Header({ toggleUserInfo }) {
  const [userData, dispatch] = UserContextProvider();
  const userInfo = userData.userInfo;

  const searchMentor = (e) => {
    e.preventDefault();
    const username = e.target.mentorUsername.value;
    const subject = e.target.mentorSubject.value;
    const jwt = sessionStorage.getItem("jwtToken");
    console.log([username, subject]);
    axios
      .post(
        searchapi,
        {
          username,
          subject,
        },
        {
          headers: {
            authorization: "Bearer " + jwt,
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  };

  // Profile pic declaring part
  const profile = userInfo.profile ? baseUrl + userInfo.profile : alt_profile;

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
          <form onSubmit={searchMentor}>
            <input
              type="text"
              name="mentorUsername"
              placeholder="Enter the username of mentor to search..."
            />
            <select name="mentorSubject">
              <option value="" selected>
                All subject
              </option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              {userData.userInfo.exam === "JEE" ? (
                <option value="maths">Maths</option>
              ) : (
                <option value="biology">Biology</option>
              )}
            </select>
            <button type="submit">
              <i className="fa fa-search "></i>
            </button>
          </form>
        </div>
      </div>

      <div className="header__profile" onClick={toggleUserInfo}>
        <img src={profile} alt="" />
      </div>
    </div>
  );
}

export default Header;
