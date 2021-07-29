import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function StudentPage() {
  const history = useHistory();
  const [userData, setUserData] = useState({});
  // checking if user is authenticated,else it will redirect to homepage
  useEffect(() => {
    const jwt = sessionStorage.getItem("jwtToken");
    console.log(jwt);
    const storedUser = sessionStorage.getItem("userData");
    console.log(storedUser);
    if (storedUser) setUserData(storedUser);
    console.log(userData);
    if (!jwt) {
      history.push("/");
    }
  }, []);

  // logging out===clearing session storage and redirecting to home page
  const logout = () => {
    sessionStorage.clear();
    history.push("/");
  };

  return (
    <div className="studentPage">
      <h1>This is the student page</h1>
      <button onClick={logout}>log out</button>
      <h3>hello {userData.username}</h3>
    </div>
  );
}

export default StudentPage;
