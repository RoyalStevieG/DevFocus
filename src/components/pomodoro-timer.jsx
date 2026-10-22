import React, { useState } from "react";
import { useTimer } from "react-timer-hook";
import { useNavigate } from "react-router-dom";

function Pomodoro_Timer() {
  const [work_session, setWork_session] = useState(25);
  const [break_session, setBreak_session] = useState(5);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 60 * work_session);

  const { minutes, hours, pause, resume } = useTimer({
    expiryTimestamp: time,
    autoStart: false,
    onExpire: () => console.warn("onExpire called"),
  });

  const navigate = useNavigate();

  function goToDashboard() {
    navigate("/dashboard");
  }

  return (
    <div>
      <div id="buttonBox">
        <button onClick={goToDashboard}>Back</button>
      </div>
      <div style={{ textAlign: "center" }}>
        <h1>Pomodoro Timer</h1>
        <div style={{ fontSize: "100px" }}>
          <span>{hours}h</span>:<span>{minutes}m</span>
        </div>
        <button onClick={pause}>Stop</button>
        <button onClick={resume}>Start</button>
      </div>
    </div>
  );
}

export default Pomodoro_Timer;
