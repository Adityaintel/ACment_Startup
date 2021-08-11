import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./css/UserPage.css";
import UserContextProvider from "./UserContext";
import Header from "./Header";
import UserInfo from "./UserInfo";

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

  console.log(userData);
  return (
    <div className="userpage">
      <Header />
      <div className="userpage__content">
        <div className="userpage__sidebar"></div>
        <div className="userpage__mainContent">
          <h2>This is the student page</h2>
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
