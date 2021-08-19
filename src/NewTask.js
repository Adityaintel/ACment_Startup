import React, { useState } from "react";
import UserContextProvider from "./UserContext";
import "./css/NewTask.css";
import prof from "./images/backwaters.jpg";

function NewTask() {
  const [userData, setUserData] = UserContextProvider();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assigned: [],
  });

  const taskDefiner = (event, field) => {
    const temptask = { ...newTask };
    temptask[field] = event.target.value;
    setNewTask(temptask);
  };

  const followers = [
    {
      id: 123,
      profile: prof,
      username: "Raju",
    },
    {
      id: 124,
      profile: prof,
      username: "Ramu",
    },
    {
      id: 125,
      profile: prof,
      username: "Abu",
    },
    {
      id: 126,
      profile: prof,
      username: "KingKhan",
    },
    {
      id: 127,
      profile: prof,
      username: "Harry",
    },
  ];

  return (
    <div className="newTask">
      <div className="newTask__container">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title for new task"
          value={newTask.title}
          onChange={(e) => {
            taskDefiner(e, "title");
          }}
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          rows="5"
          placeholder="Description for new task"
          value={newTask.description}
          onChange={(e) => {
            taskDefiner(e, "description");
          }}
        />
        <label htmlFor="followers">Assign this task to</label>
        <DropDown
          followers={followers}
          newTask={newTask}
          setNewTask={setNewTask}
        />
        <label htmlFor="studyMaterial">Add study material</label>
        <input type="file" name="studyMaterial" id="studyMaterial" multiple />
        <label htmlFor="deadline">Choose a deadline</label>
        <input type="datetime-local" name="deadline" id="deadline" />
        <button type="submit">Assign Task</button>
      </div>
    </div>
  );
}

export default NewTask;

// Dropdown for selecting students
const DropDown = ({ followers, newTask, setNewTask }) => {
  // To control expansion and folding of dropdown
  let expanded = false;
  const dropDownHandler = () => {
    const dropdown = document.querySelector(".dropdown__alloptions");
    if (expanded) {
      dropdown.style.display = "none";
      expanded = false;
    } else {
      dropdown.style.display = "block";
      expanded = true;
    }
  };

  const selectAllHandler = (e) => {
    const allOptions = document.querySelectorAll(".dropdown__option");
    if (e.target.checked) {
      const ids = followers.map((follower) => follower.id);
      allOptions.forEach((option) => option.classList.add("selected"));
      setNewTask({ ...newTask, assigned: ids });
    } else {
      allOptions.forEach((option) => option.classList.remove("selected"));
      setNewTask({ ...newTask, assigned: [] });
    }
  };

  const checkHandler = (e, id) => {
    const option = e.currentTarget;
    console.log(option);
    if (option.classList.contains("selected")) {
      option.classList.remove("selected");
      setNewTask({
        ...newTask,
        assigned: newTask.assigned.filter((ID) => ID !== id),
      });
    } else {
      option.classList.add("selected");
      setNewTask({ ...newTask, assigned: [...newTask.assigned, id] });
    }
  };

  // console.log(newTask);

  return (
    <div className="dropdown">
      <div className="dropdown__selector" onClick={dropDownHandler}>
        <h4>Assign this task to</h4>
        <div className="dropdown__selectAllCheckbox">
          <label htmlFor="selectAll">Select all</label>
          <input
            type="checkbox"
            name="selectAll"
            id="selectAll"
            onChange={selectAllHandler}
          />
        </div>
      </div>
      <div className="dropdown__alloptions">
        {followers.map((follower) => (
          <div
            className="dropdown__option"
            onClick={(e) => checkHandler(e, follower.id)}
          >
            <div className="dropdown_mentorProfile">
              <img src={follower.profile} alt="" />
            </div>
            <h4>{follower.username}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
