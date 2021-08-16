import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/UserPage.css";
import UserContextProvider from "./UserContext";
import Header from "./Header";
import UserInfo from "./UserInfo";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

function MentorPage() {
  const history = useHistory();

  // taking data from userContext
  const [userData, dispatch] = UserContextProvider();
  const userInfo = userData.userInfo; //accessing userinfo part inside reducer

  // checking if user is authenticated,else it will redirect to homepage
  useEffect(() => {
    const jwt = sessionStorage.getItem("jwtToken");
    console.log(jwt);

    if (!jwt) {
      history.push("/");
    }
  }, []);

  // logging out===clearing session storage and redirecting to home page
  const logout = () => {
    sessionStorage.clear();
    history.push("/");
  };

  // showing and hiding userInfo part
  const toggle_userInfo = () => {
    const userInfo = document.querySelector(".userpage__userInfo");
    userInfo.classList.toggle("hidden_userpage__userInfo");
  };

  // ==========================   Video Upload part  ====================================

  const uploadVideo = (e) => {
    e.preventDefault();
    const videoData = new FormData();
    videoData.append("video", e.target.video.files[0]);

    console.log(videoData);

    const jwt = sessionStorage.getItem("jwtToken");
    const category = userData.category;

    //  API URL part
    const videoURL = baseUrl + "/videos";
    console.log(videoURL);

    axios
      .post(videoURL, videoData, {
        headers: {
          authorization: "Bearer " + jwt,
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        alert(res.statusText);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  // =========================================================================================

  // Minimizing and maximizing sidebar width
  const adjustSidebar = () => {
    const sideBar = document.querySelector(".userpage__sidebar");
    sideBar.classList.toggle("userpage__sidebar__maximized");
  };

  return (
    <div className="userpage">
      <Header toggleUserInfo={toggle_userInfo} />
      <div className="userpage__content">
        <div className="userpage__sidebar">
          <div className="userpage__hamburger" onClick={adjustSidebar}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="userpage__mainContent">
          <h2>This is the mentor page</h2>
          <form onSubmit={uploadVideo}>
            <label htmlFor="video">Upload video : </label>
            <input type="file" accept="video/*" name="video" id="video" />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="userpage__userInfo hidden_userpage__userInfo">
          <UserInfo />
        </div>
      </div>
    </div>
  );
}

export default MentorPage;
