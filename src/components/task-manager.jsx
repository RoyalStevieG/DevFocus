import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "./components.css";

function Task_Manager() {
  const [data, setData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [newProjectName, setNewProjectName] = useState("");
  const [newTasks, setNewTasks] = useState([
    { TaskName: "", Status: "Created" },
  ]);
  const Projects = [];

  const options = [
    { value: "Created", label: "Created" },
    { value: "Assigned", label: "Assigned" },
    { value: "Started", label: "Started" },
    { value: "Finished", label: "Finished" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const updateTaskStatus = (projectId, taskId, newStatus) => {
    const updatedData = data.map((project) => {
      if (project._id.$oid === projectId) {
        const updatedTasks = project.TasksList.map((task) =>
          task.Task_id.$oid === taskId ? { ...task, Status: newStatus } : task
        );
        return { ...project, TasksList: updatedTasks };
      }
      return project;
    });

    setData(updatedData);
  };

  const navigate = useNavigate();

  function goToDashboard() {
    navigate("/dashboard");
  }

  if (data !== null) {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      Projects.push({ value: element._id, label: element.ProjectName });
    }
  }

  function getTasks(option) {
    let tasksOutput = [<li key={0}>Task Name: Status</li>];
    if (data !== null) {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (option == element._id) {
          for (let i = 0; i < element.TasksList.length; i++) {
            let task = element.TasksList[i];
            tasksOutput.push(
              <div key={i + 1}>
                <li key={i + 1}>
                  {task.TaskName}
                  {":"}
                  <Select
                    className="custom-select"
                    id="small"
                    defaultInputValue={task.Status}
                    value={task.Task_id}
                    onChange={updateStatus}
                    options={options}
                  />
                </li>
              </div>
            );
          }
        }
      }
      setTasks(tasksOutput);
    }
  }

  const handleSelectChange = (option) => {
    if (option != null) {
      setSelectedOption(option);
      getTasks(option.value);
    }
  };

  const updateStatus = (option) => {
    if (option != null) {
      updateTaskStatus(selectedOption.value, option.value, option.label);
      getTasks(selectedOption.value);
    }
  };

  const handleTaskChange = (index, event) => {
    const updatedTasks = [...newTasks];
    updatedTasks[index][event.target.name] = event.target.value;
    setNewTasks(updatedTasks);
  };

  const addTask = () => {
    setNewTasks([...newTasks, { TaskName: "", Status: "Created" }]);
  };

  const handleUpload = (event) => {
    event.preventDefault();

    const projectData = {
      ProjectName: newProjectName,
      TasksList: newTasks,
    };

    axios
      .post("http://localhost:5000/api/upload", projectData)
      .then((response) => {
        console.log("Data uploaded:", response.data);
        axios
          .get("http://localhost:5000/api/data")
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading data:", error);
      });
  };

  return (
    <div>
      <div id="buttonBox">
        <button onClick={goToDashboard}>Back</button>
      </div>
      <div style={{ textAlign: "center" }}>
        <h1>Task Manager</h1>
        <Select
          value={selectedOption}
          onChange={handleSelectChange}
          options={Projects}
        />
        <ul>{tasks}</ul>

        <div>
          <h2>Add New Project</h2>
          <form onSubmit={handleUpload}>
            <div>
              <label>Project Name:</label>
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
              />
            </div>
            <div>
              {newTasks.map((task, index) => (
                <div key={index}>
                  <label>Task Name:</label>
                  <input
                    type="text"
                    name="TaskName"
                    value={task.TaskName}
                    onChange={(e) => handleTaskChange(index, e)}
                  />
                  <label>Status:</label>
                  <select
                    name="Status"
                    value={task.Status}
                    onChange={(e) => handleTaskChange(index, e)}
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <button type="button" onClick={addTask}>
                Add Task
              </button>
            </div>
            <button type="submit">Upload Project</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Task_Manager;
