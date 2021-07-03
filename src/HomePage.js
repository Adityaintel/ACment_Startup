import React from "react";
import "./HomePage.css";
import page2Image from "./images/confused girl.jpg"
function HomePage() {
  return (
    <div className="homepage">
      {/* <div className="bgColor"></div> */}
      <div className="page1">
        <div className="page1__navbar">
          <div className="page1__logo">
            <div className="logo">
              <img src="" alt="" />
            </div>
            <h2 className="name"> YourGuide</h2>
          </div>
          <div className="page1__right">
            <div className="page1__info">
              <a href="#"><h3>Home</h3></a>
              <a href="#"><h3>About</h3></a>
              <a href="#"><h3>Contact</h3></a>
            </div>
            <div className="page1__register">
              <button className="page1__login">Log In</button>
              <button className="page1__signup">Sign Up</button>
            </div>
          </div>
        </div>
        <div className="page1__content">
          <div className="page1__intro">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae,
              delectus.
            </p>
          </div>
        </div>
      </div>
      <div className="page2">
      <div className="page2__image">
          <img src={page2Image} alt="" />
        </div>
        <p className="page2__content">
          Are you Pursuing JEE or NEET?
          <br />
          Don't know where to start and what to do?<br/>
          Don't have a proper mentor to guide you?<br/>
          <h3>We are here for you!</h3>
        </p>
        
      </div>
    </div>
  );
}

export default HomePage;
