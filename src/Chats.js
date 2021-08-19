import React from "react";
import "./css/Chats.css";
import ChatPage from "./ChatPage";
import image from "./images/backwaters.jpg";

function Chats() {
  const person = {
    profile: image,
    username: "Raju",
  };

  return (
    <div className="chats">
      <div className="chats__sidebar">
        <h2>Students</h2>
        <div className="chats__sidebarlist"></div>
      </div>
      <div className="chats__chatpage">
        <ChatPage person={person} />
      </div>
    </div>
  );
}

export default Chats;
