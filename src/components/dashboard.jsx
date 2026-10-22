import React from "react";
import { useNavigate } from "react-router-dom";
import { link } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  function goToDashboard() {
    navigate("/dashboard");
  }

  function pomodoroTimer() {
    navigate("/pomodoro-timer");
  }

  function taskManager() {
    navigate("/task-manager");
  }

  function dataComponent() {
    navigate("/dataComponent");
  }

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>Task Management System</h1>
        <div className="grid-container">
          <div className="grid-item">
            <button onClick={taskManager}>Task Manager</button>
          </div>
          <div className="grid-item">
            <button onClick={pomodoroTimer}>Focused Work Sessions</button>
          </div>
        </div>
      </div>
    </div>
  );
}
