import React, { useEffect, createRef } from "react";
import "./HomePage.css";
import page2Image from "./images/confused girl.jpg";

function HomePage() {
  window.addEventListener("scroll", () => {
    const navBar = document.querySelector(".page1__navbar");
    const regBtn = document.querySelectorAll(".page1__registerBtn");
    let scrollPos = window.scrollY;

    console.log(scrollPos);
    if (scrollPos >= 100) {
      navBar.classList.add("page1__navbarNew");
      [...regBtn].forEach((elem) => elem.classList.add("register__buttonNew"));
    } else {
      navBar.classList.remove("page1__navbarNew");
      [...regBtn].forEach((elem) =>
        elem.classList.remove("register__buttonNew")
      );
    }
  });

  return (
    <div className="homepage">
      <div className="page1__navbar">
        <div className="page1__logo">
          <div className="logo">
            <img src="" alt="" />
          </div>
          <h2 className="name"> YourGuide</h2>
        </div>
        <div className="page1__right">
          <div className="page1__info">
            <a href="#">
              <h3>Home</h3>
            </a>
            <a href="#">
              <h3>About</h3>
            </a>
            <a href="#">
              <h3>Contact</h3>
            </a>
          </div>
          <div className="page1__register">
            <button className="page1__registerBtn">Log In</button>
            <button className="page1__registerBtn">Sign Up</button>
          </div>
        </div>
      </div>
      <div className="page1">
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
          Don't know where to start and what to do?
          <br />
          Don't have a proper mentor to guide you?
          <br />
          <b>We are here for you!</b>
        </p>
      </div>
      <div className="homepage__contact">
        <h2>Leave a message...</h2>
        <form action="" className="homepage__contactForm">
          <input type="text" name="name" placeholder="Name" className="name" />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="email"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="subject"
          />
          <textarea
            name="message"
            className="message"
            cols="30"
            rows="6"
            placeholder="Message..."
          />
          <button type="submit" className="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="homepage__footerSpaceOccupier"></div>
      <div className="homepage__footer">This is the footer</div>
    </div>
  );
}

export default HomePage;
