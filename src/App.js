import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";
import Login from "./Login";
// import Signup from "./Signup";
import StudentPage from "./StudentPage";
import MentorPage from "./MentorPage";
import FileUploader from "./FileUploader";

function App() {
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
