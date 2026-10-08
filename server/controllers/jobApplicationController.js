const JobApplication = require("../models/JobApplication");

// Create a new job application
const createJobApplication = async (req, res, next) => {
  try {
    const application = await JobApplication.create(req.body);

    res.status(201).json({
      success: true,
      message: "Job application created successfully",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

// Get all job applications
const getJobApplications = async (req, res, next) => {
  try {
    const applications = await JobApplication.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

// Get a single job application
const getJobApplicationById = async (req, res, next) => {
  try {
    const application = await JobApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Job application not found",
      });
    }

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

// Update a job application
const updateJobApplication = async (req, res, next) => {
  try {
    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Job application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job application updated successfully",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a job application
const deleteJobApplication = async (req, res, next) => {
  try {
    const application = await JobApplication.findByIdAndDelete(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Job application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job application deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createJobApplication,
  getJobApplications,
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication,
};