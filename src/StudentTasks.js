import React, {useState, useEffect, useRef} from 'react';
import './css/Tasks.css';
import UserContextProvider from './UserContext';
import axios from 'axios';
import alt_profile from './images/icons/profile_alt_icon.svg';
import 'font-awesome/css/font-awesome.min.css';

const serverUrl = process.env.REACT_APP_BASE_URL;
const baseUrl = '/api';
const studentTasksUrl = baseUrl + '/tasks';
const submitTasksUrl = baseUrl + '/task/answer';

function Tasks () {
  // =================   states   ======================
  const [userData] = UserContextProvider ();
  const [pendingTasks, setpendingTasks] = useState ([]);
  const [completedTasks, setcompletedTasks] = useState ([]);
  const [taskType, settaskType] = useState ('pending');
  // ===================================================

  useEffect (() => {
    const jwt = sessionStorage.getItem ('jwtToken');
    axios
      .post (
        studentTasksUrl,
        {},
        {
          headers: {
            authorization: 'Bearer ' + jwt,
          },
        }
      )
      .then (res => {
        console.log (res);
        sortTasks (res.data);
      })
      .catch (err => {
        console.log (err);
      });
  }, []);

  const sortTasks = tasks => {
    let completed = [], pending = [];
    tasks.forEach (task => {
      let pos = task.answers.findIndex (
        ans => ans.answerBy.toString () === userData.userInfo.userId.toString ()
      );
      if (pos >= 0) completed = [...completed, task];
      else {
        pending = [...pending, task];
      }
    });
    setpendingTasks (pending);
    setcompletedTasks (completed);
    console.log ('pending tasks', pending);
    console.log ('completed tasks', completed);
  };

  const changeMainContent = (e, flag) => {
    console.log ('changing content');
    settaskType (flag);
    const btns = document.querySelectorAll ('.tasks__switchBtn');
    btns.forEach (btn => btn.classList.remove ('tasks__switchBtn__active'));
    e.target.classList.add ('tasks__switchBtn__active');
  };

  return (
    <div className="tasks">
      <div className="tasks__header">
        <button
          onClick={e => {
            changeMainContent (e, 'pending');
          }}
          className="tasks__switchBtn tasks__switchBtn__active"
        >
          Pending
        </button>
        <button
          onClick={e => {
            changeMainContent (e, 'completed');
          }}
          className="tasks__switchBtn"
        >
          Completed
        </button>
      </div>
      <div className="tasks__container">
        {taskType === 'pending'
          ? <AssignedTasks tasks={pendingTasks} submitted={false} />
          : <AssignedTasks tasks={completedTasks} submitted={true} />}
      </div>
    </div>
  );
}

export default Tasks;

const AssignedTasks = ({tasks, submitted}) => {
  // Function for submitting answers
  // State for storing the currently submitting task data
  const submissionRef = useRef ();
  const [submittingTask, setSubmittingTask] = useState (null);

  const showTaskSubmit = task => {
    submissionRef.current.classList.add ('assignedTasks__submitFormShow');
    setSubmittingTask (task);
  };
  const hideTaskSubmit = () => {
    submissionRef.current.classList.remove ('assignedTasks__submitFormShow');
    setSubmittingTask (null);
  };
  console.log (submittingTask);

  const submitTask = e => {
    e.preventDefault ();
    const jwt = sessionStorage.getItem ('jwtToken');
    const answerForm = new FormData ();
    answerForm.append ('taskId', submittingTask._id);
    answerForm.append ('remarks', e.target.remarks.value);
    answerForm.append ('answer', e.target.answer.files[0]);
    axios
      .post (submitTasksUrl, answerForm, {
        headers: {
          authorization: 'Bearer ' + jwt,
        },
      })
      .then (res => {
        console.log (res);
        hideTaskSubmit ();
      })
      .catch (err => {
        console.log (err.response.data.error);
        alert (err.response.data.error);
      });
  };

  return (
    <div className="assignedTasks">
      <form
        ref={submissionRef}
        className="assignedTasks__submitForm"
        onSubmit={submitTask}
      >
        <div
          className="assignedTasks__submitFormClose"
          onClick={hideTaskSubmit}
        >
          <i class="fa fa-times" aria-hidden="true" />
        </div>
        <h2>Submission Form</h2>
        <label htmlFor="answer">Upload the submission:</label>
        <input
          type="file"
          name="answer"
          id="answer"
          required
          accept="application/pdf"
        />
        <label htmlFor="remarks">Enter remarks if any:</label>
        <textarea rows="3" name="remarks" id="remarks" placeholder="remarks" />
        <button type="submit">Submit</button>
      </form>
      {tasks && tasks.length > 0
        ? <div className="assignedTasks__container">
            {tasks.map ((task, index) => (
              <TaskCard
                key={index}
                taskData={task}
                showTaskSubmit={showTaskSubmit}
                submitted={submitted}
              />
            ))}
          </div>
        : <h1 className="assignedTasks__notasks">No tasks yet</h1>}
    </div>
  );
};

const TaskCard = ({taskData, showTaskSubmit, submitted}) => {
  console.log (taskData.postedBy.profile);

  return (
    <div className="taskCard">
      <div className="taskCard__mentorInfo">
        <div className="taskCard__mentorProfile">
          <img
            src={serverUrl + taskData.postedBy.profile}
            alt=""
            onError={e => {
              e.target.src = alt_profile;
              e.target.onError = null;
            }}
          />
        </div>
        <h3>{taskData.postedBy.username}</h3>
      </div>
      <div className="taskCard__taskData">
        <h3>{taskData.title}</h3>
        <p>{taskData.info}</p>
      </div>
      <div className="taskCard__taskAttachment">
        <a
          href={baseUrl + taskData.task}
          target="_blank"
          rel="noreferrer"
          // download={taskData.title}
        >
          <button title="click to view the attachment with this task">
            Attachment
          </button>
        </a>
        {submitted
          ? <button
              className="taskCard__submittedBtn"
              title="Already submitted"
            >
              Submitted
            </button>
          : <button
              onClick={() => {
                showTaskSubmit (taskData);
              }}
              title="Submit answer"
            >
              Submit
            </button>}
      </div>
      <div className="taskCard__taskDue">
        <p>
          Deadline:&nbsp;&nbsp;
          {taskData.deadline
            ? new Date (taskData.deadline).toDateString () +
                '\t\t\t\t\t\t' +
                new Date (taskData.deadline).toLocaleTimeString ()
            : 'No due date'}
        </p>
      </div>
    </div>
  );
};
