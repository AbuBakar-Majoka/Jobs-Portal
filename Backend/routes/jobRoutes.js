const express = require("express");
const router = express.Router();
const {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
  filteringDetails,
} = require("../controllers/jobsController");

// POST route to add a job
router.post("/jobs", createJob);

// GET route to add a job
router.get("/jobs", getJobs);

// Update Job by ID
router.put("/jobs/:id", updateJob);

// Delete Job by ID
router.delete("/jobs/:id", deleteJob);

// Filtering Details
router.get("/filteringDetails", filteringDetails);

module.exports = router;
