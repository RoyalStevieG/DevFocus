const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

// Enable CORS to allow requests from the Electron app
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust this to match the URL of your Electron app
  })
);

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB Connection
// The connection string is read from backend-server/.env, which is git-ignored.
// Copy .env.example to .env and put your own MongoDB connection string in it.
require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error("MONGODB_URI is not set. Copy .env.example to .env and add your connection string.");
  process.exit(1);
}

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// mongoose schemes
const taskSchema = new mongoose.Schema({
  Task_id: mongoose.Schema.Types.ObjectId,
  TaskName: String,
  Status: String,
});

const projectSchema = new mongoose.Schema({
  ProjectName: String,
  TasksList: [taskSchema],
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

// Example API endpoint to get data from MongoDB
app.get("/api/data", async (req, res) => {
  try {
    console.log("Received request for /api/data"); // Log when the endpoint is hit
    const data = await Project.find();
    // console.log("Data retrieved from database:", data); // Log the data retrieved
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" }); // Send error response
  }
});

// Add a new document to the Example collection
app.post("/api/upload", async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
