import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";
import "./Signup.css";
import StudentSignup from "./StudentSignup";
import MentorSignup from "./MentorSignup";
import axios from "axios";


console.log(process.env.REACT_APP_BASE_URL);

function Signup() {

  // Sending data to server
  const signupUser = (e) => {
    e.preventDefault();
    console.log("submitting data...");
    if (category === "Student") {
      console.log("submitting student data");
      const data = {
        username: studentData.username,
        email: studentData.email,
        phone: studentData.phone,
        parent_phone: studentData.parent_phone,
        address: studentData.student__address,
        password: studentData.password,
        exam: studentData.student__exam,
      };
      const url = process.env.REACT_APP_BASE_URL+"/user/register"; 
      axios.post(url, data).then((res) => {
        console.log(res);
      });
    } else {
      console.log("submitting mentor data");
      const data = {
        username: mentorData.username,
        email: mentorData.email,
        phone: mentorData.mentor__phone,
        address: mentorData.mentor__address,
        password: mentorData.password,
        exam: mentorData.mentor__exam,
        subject: mentorData.mentor__subject,
      };
      const url = process.env.REACT_APP_BASE_URL + "mentor/register";
      axios.post(url, data).then((res) => {
        console.log(res);
      });
    }
  };

  // To store whether the user is mentor or student
  const [category, setcategory] = useState("Student");

  // to store the student data if the user is student
  const [studentData, setstudentData] = useState({
    username: "",
    email: "",
    phone: "",
    parent_phone: "",
    student__address: "",
    student__exam: "JEE",
    password: "",
  });

  // to store the mentor data if the user is mentor
  const [mentorData, setmentorData] = useState({
    username: "",
    email: "",
    mentor__phone: "",
    mentor__address: "",
    mentor__exam: "JEE",
    mentor__subject: "physics",
    password: "",
  });

  // If user is student, then oppositeCategory="mentor" :
  // This is used to display alternate signup option for mentor
  const oppositeCategory = category === "Student" ? "Mentor" : "Student";

  console.log(studentData);
  console.log(mentorData);

  const pwdShowHide = (event) => {
    console.log("checkbox clicked");
    console.log(event.target.checked);
    if (event.target.checked) {
      document.querySelector(".signup__password").type = "text";
    } else {
      document.querySelector(".signup__password").type = "password";
    }
  };

  return (
    <div className="signup">
      <Link to="/" className="logo__link">
        <div className="full__logo">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="logo__text">
            <h2>ACment</h2>
            <p>we GUIDE u RISE</p>
          </div>
        </div>
      </Link>
      <div className="signupSection">
        <div className="signup__heading">
          <h3>{category} Signup</h3>
        </div>

        <div className="signup__formContainer">
          <form className="signup__form">
            {category === "Student" ? (
              <StudentSignup
                setStudent={setstudentData}
                studentData={studentData}
              />
            ) : (
              <MentorSignup setMentor={setmentorData} mentorData={mentorData} />
            )}

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

            <button
              type="submit"
              onClick={signupUser}
              className="signup__submit"
            >
              Submit
            </button>
          </form>
        </div>

        <h5 className="sign__alternate">
          Already have an account?{" "}
          <Link to="/login" className="sign__alternateAnch">
            Log In
          </Link>
        </h5>

        <div
          className="mentorBtn"
          onClick={() => setcategory(oppositeCategory)}
        >
          Not a {category}? Sign up as <b>{oppositeCategory}</b>
        </div>
      </div>
    </div>
  );
}

export default Signup;
