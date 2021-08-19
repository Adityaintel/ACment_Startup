import React from "react";
import "./css/Chats.css";

function ChatPage({ person }) {
  return (
    <div className="chatpage">
      <div className="chatpage__header">
        <div className="chatpage__headerProfile">
          <img src={person.profile} alt="" />
        </div>
        <h2>{person.username}</h2>
      </div>
      <div className="chatpage__body"></div>
    </div>
  );
}

export default ChatPage;
