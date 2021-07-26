import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./register.css";
import axios from "axios";
import { loginValidator } from "./validator";
import mentor_icon from "./images/icons/mentor_icon.svg";
import student_icon from "./images/icons/student_icon.svg";

function Login({ close_register, open_signup }) {
  const history = useHistory();

  // Sending credentials to server through axios
  const loginUser = (e) => {
    e.preventDefault();
    if (!loginValidator(e)) {
      return;
    }

    if (category === "student") {
      const url = process.env.REACT_APP_BASE_URL + "/user/login";
      const data = {
        email: studentCred.email,
        password: studentCred.password,
      };
      // axios
      //   .post(url, data)
      //   .then((res) => {
      //     // store response returned from server related to user in the context
      //     console.log(res);
      //     history.push("/studentpage");
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     console.log(err.response.data.message);
      //   });
    } else {
      const url = process.env.REACT_APP_BASE_URL + "/mentor/login";
      const data = {
        email: mentorCred.email,
        password: mentorCred.password,
      };
      // axios
      //   .post(url, data)
      //   .then((res) => {
      //     console.log(res);
      //     history.push("/mentorpage");
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     console.log(err.response.data.message);
      //   });
    }
  };

  const [category, setcategory] = useState("student");
  const oppositeCategory = category === "student" ? "mentor" : "student";

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
      document.querySelector(".register__password").type = "text";
    } else {
      document.querySelector(".register__password").type = "password";
    }
  };

  return (
    <div className="register">
      <div className="  registerSection">
        {/* this is for purple circle in background */}
        <div className="purple_circle"></div>
        {/* ================================================= */}
        <div className="cross" onClick={close_register}>
          &#x274C;
        </div>
        <div className="register__heading">
          <h1>SIGN IN</h1>
        </div>

        <div className="register__formContainer">
          <form className="register__form" onSubmit={loginUser}>
            <label for="email">Enter Email</label>
            <input
              type="email"
              minLength="6"
              name="email"
              placeholder="Enter Email"
              className="register__email"
              onChange={changeHandler}
              required
            />
            <span className="email__error error"></span>

            <label for="password">Password</label>
            <input
              type="password"
              minLength="8"
              name="password"
              placeholder="Password"
              className="register__password"
              onChange={changeHandler}
              required
            />
            <span className="password__error error"></span>

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

            <button type="submit" className="register__submit">
              SIGN IN
            </button>
          </form>
          <h5 className="sign__alternate">
            Create a new account?{" "}
            <span className="sign__alternateAnch" onClick={open_signup}>
              Sign up
            </span>
          </h5>
          <hr />
          <h4 className="or">OR</h4>
          <div
            className="mentorBtn"
            onClick={() => setcategory(oppositeCategory)}
          >
            <div className="user_icon">
              <img
                src={oppositeCategory === "mentor" ? mentor_icon : student_icon}
                alt=""
              />
            </div>
            Sign in as&nbsp;{oppositeCategory}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
