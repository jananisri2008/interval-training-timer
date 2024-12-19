import React, { useState, useEffect, useRef } from "react";

function AppCrud() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: "",
    workHours: "",
    workMinutes:"",
    workSeconds: "",
    category: "",
  });
  const [categories, setCategories] = useState([""]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      clearInterval(intervalRef.current); 
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

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
      workHours: "",
      workMinutes: "",
      workSeconds: "",
      category: "",
    });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    if (currentTaskId === id) resetTimer();
    if (selectedTaskId === id) setSelectedTaskId(null);
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

  const startTimer = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setCurrentTaskId(id);
      setTimeLeft(task.workDuration);
      setIsRunning(true);
    }
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

  const handleDropdownChange = (event) => {
    const selectedId = event.target.value;
    setSelectedTaskId(selectedId === "none" ? null : Number(selectedId));
  };

  return (
    <div className="app">
      <h1>Interval Training Timer</h1>

      {/* Task Form */}
      <div className="task-form">
        <input
          type="text"
          className="textbox"
          placeholder="Task Name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
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
      </div>

      {/* Dropdown */}
      <div className="task-dropdown">
        <select onChange={handleDropdownChange}>
          <option value="none">Select a Task</option>
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.name}
            </option>
          ))}
        </select>
      </div>

      {selectedTaskId && (
        <div className="task-details">
          {tasks
            .filter((task) => task.id === selectedTaskId)
            .map((task) => (
              <div key={task.id}>
                <p>Duration: {formatTime(task.workDuration)}</p>
                <p>Category: {task.name|| "None"}</p>
                <button
                  onClick={() => startTimer(task.id)}
                  className="startbtn"
                  // disabled={isRunning && currentTaskId === task.id}
                >
                  Start
                </button>
                <button onClick={() => editTask(task)} className="editbtn">
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="deletebtn"
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      )}

      {/* Timer Display */}
      {currentTaskId && (
        <div className="timer-display">
          <h2>Current Task Time: {formatTime(timeLeft)}</h2>
          <button onClick={stopTimer} className="stopbtn">
            Stop
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
