import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";
import "./Login.css";
import axios from "axios";

function Login() {
  // Sending credentials to server through axios
  const loginUser = (e) => {
    e.preventDefault();
    if (category === "Student") {
      const url = process.env.REACT_APP_BASE_URL + "/user/login";
      const data = {
        email: studentCred.email,
        password: studentCred.password,
      };
      axios.post(url, data).then((res) => {
        console.log(res);
      });
    } else {
      const url = process.env.REACT_APP_BASE_URL + "/mentor/login";
      const data = {
        email: mentorCred.email,
        password: mentorCred.password,
      };
      axios.post(url, data).then((res) => {
        console.log(res);
      });
    } 
  };

  const [category, setcategory] = useState("Student");
  const oppositeCategory = category === "Student" ? "Mentor" : "Student";

  // state variable for student credentials
  const [studentCred, setstudentCred] = useState({
    email: "",
    password: "",
  });

  // state variable for mentor credentials
  const [mentorCred, setmentorCred] = useState({
    email: "",
    password: "",
  });

  // Handling changes for each input part, storing it in state variable
  const changeHandler = (event) => {
    if (category === "Student") {
      const cred = { ...studentCred };
      const field = event.target.name;
      const value = event.target.value;
      cred[field] = value;
      setstudentCred(cred);
    } else {
      const cred = { ...mentorCred };
      const field = event.target.name;
      const value = event.target.value;
      cred[field] = value;
      setmentorCred(cred);
    }
  };

  const pwdShowHide = (event) => {
    console.log("checkbox clicked");
    console.log(event.target.checked);
    if (event.target.checked) {
      document.querySelector(".login__password").type = "text";
    } else {
      document.querySelector(".login__password").type = "password";
    }
  };

  return (
    <div className="login">
      <div className="loginSection">
        <Link to="/" className="logo__link">
          <div className="login__full__logo">
            <div className="login__logo">
              <img src={logo} alt="" />
            </div>
            <h2>ACment</h2>
            <p>we GUIDE u RISE</p>
          </div>
        </Link>

        <div className="login__heading">
          <h3>{category} login</h3>
        </div>

        <div className="login__formContainer">
          <form className="login__form">
            <input
              type="email"
              minLength="6"
              name="email"
              placeholder="Enter your email"
              className="login__email"
              onChange={changeHandler}
            />
            <input
              type="password"
              minLength="6"
              name="password"
              placeholder="Enter password"
              className="login__password"
              onChange={changeHandler}
            />

            <div className="pwdCheckbox">
              <input
                type="checkbox"
                name="pwdCheck"
                value={true}
                onClick={pwdShowHide}
                id="pwdCheck"
                className="pwdCheck"
              />
              <label for="pwdCheck">Show password</label>
            </div>

            <button type="submit" className="login__submit" onClick={loginUser}>
              Submit
            </button>
          </form>
        </div>

        <h5 className="sign__alternate">
          Don't have an account?{" "}
          <Link to="/signup" className="sign__alternateAnch">
            Sign Up
          </Link>
        </h5>

        <div
          className="mentorBtn"
          onClick={() => setcategory(oppositeCategory)}
        >
          Not a {category}? Login as <b>{oppositeCategory}</b>
        </div>
      </div>
    </div>
  );
}

export default Login;
