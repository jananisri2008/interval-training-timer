import React from "react";
// import "./styles/AppCrud.css";

function TimerDisplay({ timeLeft, formatTime, onStop, onReset }) {
  return (
    <div className="timer-display">
      <h1>{formatTime(timeLeft)}</h1>
      <button onClick={onStop}>Pause</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}

export default TimerDisplay;
