import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
// components
// import Home from "./components/extra/home.jsx";
import Pomodoro_Timer from "./components/pomodoro-timer.jsx";
import Task_Manager from "./components/task-manager.jsx";
import "./components/app.css";
import Dashboard from "./components/dashboard.jsx";
import DataComponent from "./components/dataComponent.jsx";

//create root
const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);

// app function
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pomodoro-timer" element={<Pomodoro_Timer />} />
        <Route path="/task-manager" element={<Task_Manager />} />
        <Route path="/dataComponent" element={<DataComponent />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {/* <DataComponent /> */}
    </div>
  );
}
