const express = require("express");

const {
  createJobApplication,
  getJobApplications,
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication,
} = require("../controllers/jobApplicationController");

const router = express.Router();

router.post("/", createJobApplication);
router.get("/", getJobApplications);
router.get("/:id", getJobApplicationById);
router.put("/:id", updateJobApplication);
router.delete("/:id", deleteJobApplication);

module.exports = router;