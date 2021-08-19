import React, { useState, useEffect } from "react";
import "./css/Tasks.css";
import prof from "./images/backwaters.jpg";
import NewTask from "./NewTask";

function Tasks() {
  // =================   states   ======================
  const [tasks, setTasks] = useState([]);
  const [taskPageType, setTaskPageType] = useState("assigned");
  // ===================================================

  const taskData = {
    profile: prof,
    username: "rockyBhai",
    title: "Complete the website",
    deadline: "23:59",
  };

  const taskPageSwitcher = (e, val) => {
    const btns = document.querySelectorAll(".tasks__switchBtn");
    btns.forEach((btn) => btn.classList.remove("tasks__switchBtn__active"));
    e.target.classList.add("tasks__switchBtn__active");
    setTaskPageType(val);
  };

  useEffect(() => {
    setTasks([...tasks, taskData]);
  }, []);

  console.log(tasks);

  return (
    <div className="tasks">
      <div className="tasks__header">
        <button
          onClick={(e) => {
            taskPageSwitcher(e, "assigned");
          }}
          className="tasks__switchBtn tasks__switchBtn__active"
        >
          Assigned Tasks
        </button>
        <button
          onClick={(e) => {
            taskPageSwitcher(e, "new");
          }}
          className="tasks__switchBtn"
        >
          New Task
        </button>
      </div>
      <div className="tasks__container">
        {taskPageType === "assigned" ? (
          <AssignedTasks tasks={tasks} />
        ) : (
          <NewTask />
        )}
      </div>
    </div>
  );
}

export default Tasks;

const AssignedTasks = ({ tasks }) => {
  console.log("message from assigned tasks");
  console.log(tasks.length);
  return (
    <div className="assignedTasks">
      {tasks.length > 0 ? (
        <div className="assignedTasks__container">
          {tasks.map((task, index) => (
            <TaskCard key={index} taskData={task} />
          ))}
        </div>
      ) : (
        <div className="assignedTasks__notasks">No tasks yet</div>
      )}
    </div>
  );
};

const TaskCard = ({ taskData }) => {
  return (
    <div className="taskCard">
      <div className="taskCard__mentorInfo">
        <div className="taskCard__mentorProfile">
          <img src={taskData.profile} alt="" />
        </div>
        <h4>{taskData.username}</h4>
      </div>
      <div className="taskCard__taskTitle">
        <h3>{taskData.title}</h3>
      </div>
      <div className="taskCard__taskDue">
        <p>{taskData.deadline}</p>
      </div>
    </div>
  );
};
