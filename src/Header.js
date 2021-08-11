import React, { useState, useRef, useEffect } from "react";
import "./css/Header.css";
import alt_profile from "./images/icons/profile_alt_icon.svg";
import logo from "./images/homepage_illustrations/Acment_logo.png";
import "font-awesome/css/font-awesome.min.css";
import UserContextProvider from "./UserContext";
import axios from "axios";
import UserInfo from "./UserInfo";

const baseUrl = process.env.REACT_APP_BASE_URL;
const searchapi = baseUrl + "/mentor/search";
const followMentorUrl = baseUrl + "/user/followmentor";

function Header() {
  const [userData, dispatch] = UserContextProvider();
  const userInfo = userData.userInfo;
  const followings = userData.followings;

  // =========================  use refs  ==================================================

  const userInfoBlock = useRef(0);
  const dropDownBlock = useRef(0);
  const profileBlock = useRef(0);

  // ======================== Follow mentor part  =============================================
  const followMentor = (id) => {
    console.log(id);
    const jwt = sessionStorage.getItem("jwtToken");
    axios.post(
      followMentorUrl,
      {
        mentorId: id,
      },
      {
        headers: {
          authorization: "Bearer " + jwt,
        },
      }
    );
  };

  // =============================================================================================

  // =================================   Search mentor part  ========================================

  // const [searchResult, setSearchResult] = useState([]);
  const [dropdown, setDropdown] = useState("");

  const searchMentor = (e) => {
    e.preventDefault();
    // document.querySelector(".header__searchDropdown").innerHTML = "";
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
        dropDownBlock.current.style.display = "flex";
        const results = res.data.results.map((mentor) => {
          return (
            <div>
              <div className="mentor_profilePic">
                <img
                  src={mentor.profile ? baseUrl + mentor.profile : alt_profile}
                  alt=""
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = alt_profile;
                  }}
                />
              </div>
              <h3>{mentor.username}</h3>
              <p>
                {mentor.exam}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{mentor.subject}
                <span
                  className="mentor_follow"
                  onClick={() => followMentor(mentor._id)}
                >
                  Follow
                </span>
              </p>
            </div>
          );
        });
        results.length > 0
          ? setDropdown(results)
          : setDropdown(
              <div>
                <h3>No results found!</h3>
              </div>
            );
      });
  };

  // ===================================================================================

  // showing and hiding userInfo part
  const toggleUserInfo = () => {
    console.log("toggling userinfo");
    userInfoBlock.current.classList.toggle("hidden_userpage__userInfo");
    console.log(userInfoBlock.current.classList);
  };

  // Hide dropdown when user clicks somewhere other than dropdown
  const hideDropdown = (e) => {
    // e.stopPropagation();
    if (
      dropDownBlock.current &&
      dropDownBlock.current !== e.target &&
      !dropDownBlock.current.contains(e.target)
    ) {
      console.log("outside dropdown");
      dropDownBlock.current.style.display = "none";
    }
  };

  // To add event listeners only after component mounted
  useEffect(() => {
    document.addEventListener("click", (e) => {
      hideDropdown(e);
      hideUserInfo(e);
    });
    return () => {
      document.removeEventListener("click", (e) => {
        hideDropdown(e);
        hideUserInfo(e);
      });
    };
  }, []);

  // To close userinfo part while clicking any outside point
  const hideUserInfo = (e) => {
    if (
      userInfoBlock.current &&
      !profileBlock.current.contains(e.target) &&
      !userInfoBlock.current.classList.contains("hidden_userpage__userInfo")
    ) {
      if (
        userInfoBlock.current &&
        userInfoBlock.current !== e.target &&
        !userInfoBlock.current.contains(e.target)
      ) {
        console.log("outside userinfo");
        userInfoBlock.current.classList.add("hidden_userpage__userInfo");
      }
    }
  };

  // ====================================================================================

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
      <div className="header__right">
        {userData.category === "mentor" ? (
          ""
        ) : (
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
            <div ref={dropDownBlock} className="header__searchDropdown ">
              {dropdown}
            </div>
          </div>
        )}
        <div
          ref={profileBlock}
          className="header__profile"
          onClick={toggleUserInfo}
        >
          <img src={profile} alt="" />
        </div>
      </div>
      <div
        ref={userInfoBlock}
        className="userpage__userInfo hidden_userpage__userInfo"
      >
        <UserInfo />
      </div>
    </div>
  );
}

export default Header;
