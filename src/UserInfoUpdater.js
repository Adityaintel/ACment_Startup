import React from "react";
// import "./css/UserInfoUpdater.css";

function UserInfoUpdater({ closeUpdateInfo, userData }) {
  const userInfo = userData.userInfo;

  const defaultValuePlacer = () => {
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const address = document.getElementById("address");
    const parent_phone = document.getElementById("parent_phone");
    const subject = document.getElementById("subject");
    const exam = document.getElementById("exam");
    console.log(username);
    // username.defaultValue = userInfo.username;
  };
  defaultValuePlacer();
  return (
    <div className="userInfoUpdater">
      <div className="userInfoUpdater__container">
        {/* this is for purple circle in background */}
        <div className="purple_circle"></div>
        {/* ================================================= */}
        <div
          className="userInfoUpdater__cross"
          // onClick={ close_register }
        >
          &#x274C;
        </div>
        <div className="userInfoUpdater__heading">
          <h1>Update Profile</h1>
        </div>
        <div className="userInfoUpdater__formContainer">
          <form className="userInfoUpdater__form">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
            <label htmlFor="email">Email</label>
            <input type="text" id="email" value={userInfo.email} />
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" value={userInfo.phone} />
            <label htmlFor="address">Address</label>
            <input type="text" id="address" value={userInfo.address} />
            {/* {userData.category===} */}
            <label htmlFor="parent_phone">Parent Phone</label>
            <input
              type="text"
              id="parent_phone"
              value={userInfo.parent_phone}
            />
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" value={userInfo.subject} />

            {/* exam */}
            <label htmlFor="exam">Exam</label>
            <select
              name="student__exam"
              id="exam"
              placeholder="Exam"
              value={userInfo.exam}
              required
            >
              <option value={userInfo.exam} selected>
                {userInfo.exam}
              </option>
              <option value={userInfo.exam === "JEE" ? "NEET" : "JEE"}>
                {userInfo.exam === "JEE" ? "NEET" : "JEE"}
              </option>
            </select>

            <button
              type="submit"
              // onClick={signupUser}
              className="register__submit"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserInfoUpdater;
