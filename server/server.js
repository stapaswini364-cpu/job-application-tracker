console.log("SERVER FILE STARTED");

require("dotenv").config();

const http = require("http");
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

async function startServer() {
  const { createServer: createViteServer } = await import("vite");

  const vite = await createViteServer({
    root: path.join(__dirname, "../client"),
    server: {
      middlewareMode: true,
      hmr: true,
    },
    appType: "spa",
  });

  app.use(vite.middlewares);

  const PORT = process.env.PORT || 5000;

  const httpServer = http.createServer(app);

  httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});