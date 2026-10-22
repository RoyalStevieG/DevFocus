import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DataComponent = () => {
  const [data, setData] = useState(null);
  const [projects, setProjects] = useState(null);
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    // Make a GET request to the backend API
    axios
      .get("http://localhost:5000/api/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // navigation
  const navigate = useNavigate();

  function goToDashboard() {
    navigate("/dashboard");
  }

  if (data !== null) {
    const list = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index].ProjectName;
      list.push(element);
      // console.log(element);
    }
    console.log(list);
    // output:
    // {_id: '66d46ec05d3de301821284ec', ProjectName: 'Project1', TasksList: Array(1)}

    // const test = data[0].TasksList[0].TaskName;
    // console.log(test);
  }

  return (
    <div>
      <div id="buttonBox">
        <button onClick={goToDashboard}>Back</button>
      </div>
      <h1>Data from Backend:</h1>
      {/* <p>Projects: {data}</p> */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DataComponent;
