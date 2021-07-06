import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";
import "./Login.css";

function Login() {
  const [category, setcategory] = useState("Student");
  const oppositeCategory = category === "Student" ? "Mentor" : "Student";

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

        {/* <div className="BtnSection">
          <button onClick={() => setcategory("student")}>Student</button>
          <button onClick={() => setcategory("mentor")}>Mentor</button>
        </div> */}
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
            />
            <input
              type="password"
              minLength="6"
              name="password"
              placeholder="Enter password"
              className="login__password"
            />

            <div className="pwdCheckbox">
              <input
                type="checkbox"
                name="pwdCheck"
                value={true}
                onClick={pwdShowHide}
                className="pwdCheck"
              />
              <label for="pwdCheck">Show password</label>
            </div>

            <button type="submit" className="login__submit">
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

        <div className="mentorBtn" onClick={() => setcategory(oppositeCategory)}>
          Not a {category}? Login as <b>{oppositeCategory}</b>
        </div>
      </div>
    </div>
  );
}

export default Login;
