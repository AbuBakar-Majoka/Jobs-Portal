const Job = require("../models/jobModel");

exports.createJob = (req, res) => {
  const { title, company, location, posting_date, job_type, tags } = req.body;

  // console.log(req.body);

  if (!title || !company || !location || !posting_date) {
    return res.status(400).json({ error: "Please fill all required fields" });
  }

  Job.create(
    { title, company, location, posting_date, job_type, tags },
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error", details: err });
      }
      res.status(201).json({
        message: "Job post created successfully",
        jobId: result.insertId,
      });
    }
  );
};

exports.getJobs = (req, res) => {
  const { id, job_type, location, tags, sort } = req.query;

  Job.get(id, job_type, location, tags, sort, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "No record found" });
    }

    res.status(200).json(result);
  });
};

exports.updateJob = (req, res) => {
  const { id } = req.params;
  const { title, company, location, posting_date, job_type, tags } = req.body;

  if (!title || !company || !location || !posting_date || !job_type) {
    return res.status(400).json({ error: "Please fill all required fields" });
  }

  Job.update(
    id,
    { title, company, location, posting_date, job_type, tags },
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error", details: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Job not found" });
      }
      return res.json({ message: "Job updated successfully" });
    }
  );
};

exports.deleteJob = (req, res) => {
  const { id } = req.params;

  Job.delete(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database Error", details: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  });
};

exports.filteringDetails = (req, res) => {
  Job.getFilteringDetails((err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "No record found" });
    }

    res.status(200).json(result);
  });
};
