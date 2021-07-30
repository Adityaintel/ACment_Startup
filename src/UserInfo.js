import React from "react";
import UserContextProvider from "./UserContext";
import alt_profile from "./images/icons/profile_alt_icon.svg";
import "./css/UserInfo.css";

function UserInfo() {
  const [userData, dispatch] = UserContextProvider();
  console.log(userData);
  const userInfo = userData.userInfo;

  console.log(userInfo);

  return (
    <div className="userInfo">
      <div className="userInfo__profilePic">
        <img src={alt_profile} alt="" />
      </div>
      <h2 className="userInfo__heading">Hello {userInfo.username}</h2>
      <div className="userInfo__details">
        <h3>Email : {userInfo.email}</h3>
        <h3>Phone : {userInfo.phone}</h3>
        {userData.category === "student" ? (
          <h3>Parent's Phone : {userInfo.parent_phone}</h3>
        ) : (
          ""
        )}
        <h3>Address : {userInfo.address}</h3>
        <h3>Exam : {userInfo.exam}</h3>
        {userData.category === "mentor" ? (
          <h3>Subject : {userInfo.subject}</h3>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default UserInfo;
