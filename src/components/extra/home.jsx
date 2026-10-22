import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  function goToHome() {
    navigate("/dashboard");
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pomodoro-timer" element={<Pomodoro_Timer />} />
        <Route path="/task-manager" element={<Task_Manager />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <button onClick={goToHome}>Home</button>
      <h1>Home</h1>
    </div>
  );
}
