import React, { useState, useEffect, useRef } from "react";
import "./AppCrud.css";

function AppCrud() {
  // Task Management State
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: "",
    workHours: "",
    workMinutes: "",
    workSeconds: "",
    category: "",
  });
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Category Management State
  const [categories, setCategories] = useState(["Work", "Rest"]);

  // Timer State
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkPhase, setIsWorkPhase] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);

  const intervalRef = useRef(null);

  // Handle Timer Logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsWorkPhase((prevPhase) => !prevPhase);
            const task = tasks.find((t) => t.id === currentTaskId);
            return task.workDuration;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, currentTaskId, tasks]);

  // CRUD Handlers
  const addOrUpdateTask = () => {
    const workDuration =
      newTask.workHours * 3600 +
      newTask.workMinutes * 60 +
      newTask.workSeconds;

    if (editingTaskId !== null) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTaskId ? { ...task, ...newTask, workDuration } : task
        )
      );
      setEditingTaskId(null);
    } else {
      setTasks([
        ...tasks,
        { ...newTask, id: Date.now(), workDuration },
      ]);
    }

    if (!categories.includes(newTask.category) && newTask.category) {
      setCategories([...categories, newTask.category]);
    }

    setNewTask({
      name: "",
      workHours: 0,
      workMinutes: 0,
      workSeconds: 0,
      category: "",
    });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    if (currentTaskId === id) resetTimer();
  };

  const editTask = (task) => {
    setNewTask({
      name: task.name,
      workHours: Math.floor(task.workDuration / 3600),
      workMinutes: Math.floor((task.workDuration % 3600) / 60),
      workSeconds: task.workDuration % 60,
      category: task.category,
    });
    setEditingTaskId(task.id);
  };

  // Timer Handlers
  const startTimer = (id) => {
    setCurrentTaskId(id);
    const task = tasks.find((t) => t.id === id);
    setTimeLeft(task.workDuration);
    setIsRunning(true);
    setIsWorkPhase(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    stopTimer();
    setTimeLeft(0);
    setCurrentTaskId(null);
  };

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="app">
      <h1>Interval Training Timer</h1>

      {/* Task Form */}
       {/* Add a new category dynamically */}
      

      <div className="task-form">
      <input
          type="text"
          className="textbox"
          placeholder="Enter The Tasks."
          onBlur={(e) => {
            if (e.target.value && !categories.includes(e.target.value)) {
              setCategories([...categories, e.target.value]);
            }
          }}
        />
        <div className="time-inputs">
          <input
            type="number"
            className="timebox"
            placeholder="Hours"
            value={newTask.workHours}
            onChange={(e) =>
              setNewTask({ ...newTask, workHours: Number(e.target.value) })
            }
          />
          <input
            type="number"
            className="timebox"
            placeholder="Minutes"
            value={newTask.workMinutes}
            onChange={(e) =>
              setNewTask({ ...newTask, workMinutes: Number(e.target.value) })
            }
          />
          <input
            type="number"
            className="timebox"
            placeholder="Seconds"
            value={newTask.workSeconds}
            onChange={(e) =>
              setNewTask({ ...newTask, workSeconds: Number(e.target.value) })
            }
          />
        </div>

        <button onClick={addOrUpdateTask}>
          {editingTaskId !== null ? "Update Task" : "Add Task"}
        </button>
        <br/>

        {/* Dropdown for Task Category */}
        <select
          value={newTask.category}
          onChange={(e) =>
            setNewTask({ ...newTask, category: e.target.value })
          }
        >
          <option value="">
            Select Task 
          </option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>       
      </div>

      {/* Task List */}
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <h3>{task.name}</h3>
            <p>Duration: {formatTime(task.workDuration)}</p>
            <p>Category: {task.category}</p>
            <div>
              <button
                onClick={() => startTimer(task.id)}
                className="startbtn"
              >
                Start
              </button>
              <button
                onClick={() => editTask(task)}
                className="editbtn"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="deletebtn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Timer Display */}
      {currentTaskId && (
        <div className="timer-display">
          <h1>{formatTime(timeLeft)}</h1>
          <button onClick={stopTimer} className="stopbtn">
            Pause
          </button>
          <button onClick={resetTimer} className="resetbtn">
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default AppCrud;