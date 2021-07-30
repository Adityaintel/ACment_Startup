import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import "./css/App.css";
import HomePage from "./HomePage";
import Login from "./Login";
// import Signup from "./Signup";
import StudentPage from "./StudentPage";
import MentorPage from "./MentorPage";
import FileUploader from "./FileUploader";
import axios from "axios";
import UserContextProvider from "./UserContext";

const base_url = process.env.REACT_APP_BASE_URL;

function App() {
  const [userData, dispatch] = UserContextProvider();
  const history = useHistory();

  // To fetch all the data again during refresh and store in react context api
  useEffect(() => {
    const jwt = sessionStorage.getItem("jwtToken");
    const category = sessionStorage.getItem("usertype");
    if (jwt) {
      if (category === "student") {
        const url = base_url + "/user/getdetails";

        axios
          .get(url, {
            headers: {
              authorization: "Bearer " + jwt,
            },
          })
          .then((res) => {
            // store response returned from server related to user in the context
            const { ...user_info } = res.data;
            // console.log(jwtToken);
            console.log(user_info);

            // storing data in react context api
            dispatch({
              type: "ADD_USER",
              data: {
                category: "student",
                userInfo: user_info,
              },
            });
            console.log(userData);
            console.log("redirecting to studentpage");
          })
          .catch((err) => {
            console.log(err.message);
            alert(err.message);
          });
      } else {
        const url = base_url + "/mentor/getdetails";

        axios
          .get(url, {
            headers: {
              authorization: "Bearer " + jwt,
            },
          })
          .then((res) => {
            // store response returned from server related to user in the context
            const { ...user_info } = res.data;
            // console.log(jwtToken);
            console.log(user_info);

            // storing data in react context api
            dispatch({
              type: "ADD_USER",
              data: {
                category: "mentor",
                userInfo: user_info,
              },
            });
            console.log(userData);
            console.log("redirecting to mentorpage");
          })
          .catch((err) => {
            console.log(err.message);
            alert(err.message);
          });
      }
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          {/* <Route path="/signup">
            <Signup />
          </Route> */}
          <Route path="/mentorpage">
            <MentorPage />
          </Route>
          <Route path="/studentpage">
            <StudentPage />
          </Route>
          <Route path="/upload">
            <FileUploader />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
