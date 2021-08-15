import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/UserPage.css";
import UserContextProvider from "./UserContext";
import Header from "./Header";
import UserInfo from "./UserInfo";
import Videos from "./Videos";

const baseUrl = process.env.REACT_APP_BASE_URL;
function StudentPage() {
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

  // Minimizing and maximizing sidebar width
  const adjustSidebar = () => {
    const sideBar = document.querySelector(".userpage__sidebar");
    sideBar.classList.toggle("userpage__sidebar__maximized");
  };

  console.log(userData);
  return (
    <div className="userpage">
      <Header />
      <div className="userpage__content">
        <div className="userpage__sidebar">
          <div className="userpage__hamburger" onClick={adjustSidebar}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="userpage__mainContent">
          <Videos />
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
