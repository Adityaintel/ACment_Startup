import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function MentorPage() {
  const history = useHistory();


  // checking if user is authenticated,else it will redirect to homepage
  useEffect(() => {
    const jwt = sessionStorage.getItem("jwtToken");
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
    <div>
      <h1>This is mentor page</h1>
      <button onClick={logout}>log out</button>
    </div>
  );
}

export default MentorPage;
