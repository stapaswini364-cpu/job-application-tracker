console.log("SERVER FILE STARTED");

require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const jobApplicationRoutes = require("./routes/jobApplicationRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/applications", jobApplicationRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Job Application Tracker API is running",
  });
});

app.use(express.static(path.join(__dirname, "../client/dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});