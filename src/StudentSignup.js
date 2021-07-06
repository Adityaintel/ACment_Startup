import React from "react";

function StudentSignup({ setStudent, studentData }) {
  
  const changeHandler = (event) => {
    const data = { ...studentData };
    const field = event.target.name;
    const value = event.target.value;
    data[field] = value;
    setStudent(data);
  };

  return (
    <div className="student__details">
      <input
        type="text"
        minLength="6"
        name="username"
        placeholder="Full name"
        className="signup__name"
        onChange={changeHandler}
      />
      <input
        type="email"
        minLength="6"
        name="email"
        placeholder="Email"
        className="signup__email"
        onChange={changeHandler}
      />
      <input
        type="tel"
        pattern="[0-9]{10}"
        name="parents__phone"
        placeholder="Parent's phone no."
        className="signup__phone"
        onChange={changeHandler}
      />
      <input
        type="text"
        minLength="6"
        name="student__address"
        placeholder="Address"
        className="signup__email"
        onChange={changeHandler}
      />
      <br />
      {/* <label for="student__exam">Exam you are preparing for:</label> */}
      <select
        name="student__exam"
        id="student__exam"
        placeholder="Exam"
        onChange={changeHandler}
      >
        <option value="" disabled selected>Select exam</option>
        <option value="JEE">JEE</option>
        <option value="NEET">NEET</option>
      </select>
      <input
        type="password"
        minLength="6"
        name="password"
        placeholder="Enter password"
        className="signup__password"
        onChange={changeHandler}
      />
    </div>
  );
}

export default StudentSignup;
