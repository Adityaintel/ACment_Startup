import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import './css/UserPage.css';
import UserContextProvider from './UserContext';
import Header from './Header';
import UserInfo from './UserInfo';
import Videos from './Videos';
import StudentTasks from './StudentTasks';
import videoIcon from './images/icons/video-icon.png';
import mentorIcon from './images/icons/mentor.png';
import taskIcon from './images/icons/task-icon.png';


const baseUrl = '/api';

function StudentPage () {
  const history = useHistory ();
  const [mainContent, setMainContent] = useState (<Videos />);
  const sideBar = useRef ();

  // taking data from userContext
  const [userData, dispatch] = UserContextProvider ();
  const userInfo = userData.userInfo; //accessing userinfo part inside reducer

  // checking if user is authenticated,else it will redirect to homepage
  useEffect (() => {
    const jwt = sessionStorage.getItem ('jwtToken');
    console.log (jwt);

    if (!jwt) {
      history.push ('/');
    }
  }, []);

  // Minimizing and maximizing sidebar width
  const adjustSidebar = () => {
    console.log ('toggling sidebar');
    // const sideBar = document.querySelector(".userpage__sidebar");
    const btnTexts = document.querySelectorAll ('.userpage__sideBtn h3');
    if (btnTexts[0].style.display === 'block') {
      btnTexts.forEach (btn => {
        btn.style.display = 'none';
      });
    } else {
      btnTexts.forEach (btn => {
        btn.style.display = 'block';
      });
    }
    if (sideBar.current)
      sideBar.current.classList.toggle ('userpage__sidebar__maximized');
  };

  // To add event listeners only after component mounted
  useEffect (() => {
    document.addEventListener ('click', e => {
      closeSidebar (e);
    });
    return () => {
      document.removeEventListener ('click', e => {
        closeSidebar (e);
      });
    };
  }, []);

  const closeSidebar = e => {
    console.log ('closing sidebar');
    const hamburger = document.querySelector ('.userpage__hamburger');

    if (
      sideBar.current &&
      hamburger &&
      hamburger !== e.target &&
      !hamburger.contains (e.target) &&
      sideBar.current.classList.contains ('userpage__sidebar__maximized')
    ) {
      if (
        sideBar.current &&
        sideBar.current !== e.target &&
        !sideBar.current.contains (e.target)
      ) {
        // sideBar.current.classList.remove("userpage__sidebar__maximized");
        adjustSidebar ();
      }
    }
  };

  // Switching between various sections
  const mainContentHandler = e => {
    const sideBtns = document.querySelectorAll ('.userpage__sideBtn');
    console.log (sideBtns);
    sideBtns.forEach (btn => {
      console.log (btn.classList);
      btn.classList.remove ('userpage__sideBtn__active');
    });
    console.log (e.currentTarget);
    switch (e.currentTarget.id) {
      case 'videoBtn': {
        setMainContent (<Videos />);
        e.currentTarget.classList.add ('userpage__sideBtn__active');
        break;
      }
      case 'tasksBtn': {
        setMainContent (<StudentTasks />);
        e.currentTarget.classList.add ('userpage__sideBtn__active');
        break;
      }
      default: {
        setMainContent (<Videos />);
        e.currentTarget.classList.add ('userpage__sideBtn__active');
      }
    }
  };

  console.log (userData);
  return (
    <div className="userpage">
      <Header />
      <div className="userpage__content">
        <div ref={sideBar} className="userpage__sidebar">
          <div
            className="userpage__hamburger"
            onClick={adjustSidebar}
            title="Toggle Sidebar"
          >
            <span />
            <span />
            <span />
          </div>
          <div className="userpage__sidebarBtns">
            <button
              id="videoBtn"
              className="userpage__sideBtn__active userpage__sideBtn"
              onClick={mainContentHandler}
              title="Videos"
            >
              <div className="sidebarBtn__icon">
                <img src={videoIcon} alt="" />
              </div>
              <h3>Videos </h3>
            </button>
            <button
              id="tasksBtn"
              className="userpage__sideBtn"
              onClick={mainContentHandler}
              title="View tasks assigned"
            >
              <div className="sidebarBtn__icon">
                <img src={taskIcon} alt="" />
              </div>
              <h3>Tasks</h3>
            </button>
            <button
              id="mentorsBtn"
              className="userpage__sideBtn"
              onClick={mainContentHandler}
              title="View Following Mentors"
            >
              <div className="sidebarBtn__icon">
                <img src={mentorIcon} alt="" />
              </div>
              <h3>Mentors</h3>
            </button>
          </div>
        </div>
        <div className="userpage__mainContent">{mainContent}</div>
      </div>
    </div>
  );
}

export default StudentPage;
