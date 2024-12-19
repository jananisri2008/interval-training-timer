import React from "react";
//import "./styles/AppCrud.css";

function TaskList({ tasks, onDelete, onStart }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <h3>{task.name}</h3>
          <p>Duration: {task.workHours}:{task.workMinutes}:{task.workSeconds}</p>
          <button onClick={() => onStart(task.id)}>Start</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
