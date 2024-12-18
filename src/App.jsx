import React, { useState, useEffect, useRef } from "react";
import "./AppCrud.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    name: "",
    workHours: 0,
    workMinutes: 0,
    workSeconds: 0,
    restHours: 0,
    restMinutes: 0,
    restSeconds: 0,
  });
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkPhase, setIsWorkPhase] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsWorkPhase((prevPhase) => !prevPhase);
            const task = tasks.find((t) => t.id === currentTaskId);
            return isWorkPhase
              ? task.restDuration
              : task.workDuration;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isWorkPhase, currentTaskId, tasks]);

  const addOrUpdateTask = () => {
    const workDuration =
      newTask.workHours * 3600 +
      newTask.workMinutes * 60 +
      newTask.workSeconds;
    const restDuration =
      newTask.restHours * 3600 +
      newTask.restMinutes * 60 +
      newTask.restSeconds;

    if (editingTaskId !== null) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTaskId
            ? { ...task, ...newTask, workDuration, restDuration }
            : task
        )
      );
      setEditingTaskId(null);
    } else {
      setTasks([
        ...tasks,
        { ...newTask, id: Date.now(), workDuration, restDuration },
      ]);
    }

    setNewTask({
      name: "",
      workHours: 0,
      workMinutes: 0,
      workSeconds: 0,
      restHours: 0,
      restMinutes: 0,
      restSeconds: 0,
    });
  };

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
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="app">
      <h1>Interval Training Timer</h1>

      <div className="task-form">
        <input
          type="text"
          className="textbox"
          placeholder="Task Name"
          value={newTask.name}
          onChange={(e) =>
            setNewTask({ ...newTask, name: e.target.value })
          }
        />
        <div className="time-inputs">
          <h3>Work Duration</h3>
          <input
            type="number"
            placeholder="Hours"
            value={newTask.workHours}
            onChange={(e) =>
              setNewTask({ ...newTask, workHours: Number(e.target.value) })
            }
          />
          <input
            type="number"
            placeholder="Minutes"
            value={newTask.workMinutes}
            onChange={(e) =>
              setNewTask({ ...newTask, workMinutes: Number(e.target.value) })
            }
          />
          <input
            type="number"
            placeholder="Seconds"
            value={newTask.workSeconds}
            onChange={(e) =>
              setNewTask({ ...newTask, workSeconds: Number(e.target.value) })
            }
          />
        </div>

        <div className="time-inputs">
          <h3>Rest Duration</h3>
          <input
            type="number"
            placeholder="Hours"
            value={newTask.restHours}
            onChange={(e) =>
              setNewTask({ ...newTask, restHours: Number(e.target.value) })
            }
          />
          <input
            type="number"
            placeholder="Minutes"
            value={newTask.restMinutes}
            onChange={(e) =>
              setNewTask({ ...newTask, restMinutes: Number(e.target.value) })
            }
          />
          <input
            type="number"
            placeholder="Seconds"
            value={newTask.restSeconds}
            onChange={(e) =>
              setNewTask({ ...newTask, restSeconds: Number(e.target.value) })
            }
          />
        </div>

        <button onClick={addOrUpdateTask}>
          {editingTaskId !== null ? "Update Task" : "Add Task"}
        </button>
      </div>

      <div className="dropdown-container">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="dropdown-toggle"
        >
          {isDropdownOpen ? "Hide Tasks" : "Show Tasks"}
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            {tasks.map((task) => (
              <div key={task.id} className="dropdown-item">
                <span>{task.name}</span>
                <button onClick={() => startTimer(task.id)} className="startbtn">
                  Start
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
