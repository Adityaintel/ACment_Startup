import React, { useState, useEffect } from "react";
import "./css/Tasks.css";
import prof from "./images/backwaters.jpg";
import NewTask from "./NewTask";

function Tasks() {
  // =================   states   ======================
  const [tasks, setTasks] = useState([]);
  // ===================================================

  const taskData = [
    {
      profile: prof,
      username: "RockyBhai",
      title: "Complete the website",
      deadline: "24/05/2021 23:59",
    },
    {
      profile: prof,
      username: "Karnan",
      title: "We are team Acment",
      deadline: "20/04/2021 13:59",
    },
  ];

  useEffect(() => {
    setTasks([...tasks, ...taskData]);
  }, []);

  console.log(tasks);

  return (
    <div className="tasks">
      <div className="tasks__container">
        <AssignedTasks tasks={tasks} />
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
        <p>Deadline at {taskData.deadline}</p>
      </div>
    </div>
  );
};
