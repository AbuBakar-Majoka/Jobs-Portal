const db = require("../config/db");

const Job = {
  create: (data, callback) => {
    const sql = `INSERT INTO jobs_posts 
        (title, company, location, posting_date, job_type, tags)
        VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(
      sql,
      [
        data.title,
        data.company,
        data.location,
        data.posting_date,
        data.job_type,
        data.tags,
      ],
      callback
    );
  },

  get: (id, job_type, location, tags, sort, callback) => {
    let sql = `SELECT * FROM jobs_posts`;
    let params = [];
    let conditions = [];

    if (id) {
      conditions.push("id = ?");
      params.push(id);
    }

    if (job_type) {
      conditions.push("job_type = ?");
      params.push(job_type);
    }

    if (location) {
      conditions.push("location = ?");
      params.push(location);
    }

    if (tags) {
      const tagArray = tags.split(",");
      const tagConditions = tagArray
        .map(() => `FIND_IN_SET(?, tags)`)
        .join(" OR ");
      conditions.push(`(${tagConditions})`);
      params.push(...tagArray);
    }

    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    if (sort && sort === "posting_date_desc") {
      sql += " ORDER BY posting_date DESC";
    }

    db.query(sql, params, callback);
  },

  update: (id, data, callback) => {
    const sql = `
            UPDATE jobs_posts
            SET title = ?, company = ?, location = ?, posting_date = ?, job_type = ?, tags = ?
            WHERE id = ?
        `;
    db.query(
      sql,
      [
        data.title,
        data.company,
        data.location,
        data.posting_date,
        data.job_type,
        data.tags,
        id,
      ],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM jobs_posts WHERE id = ?", [id], callback);
  },

  getFilteringDetails: (callback) => {
    const sql = "SELECT job_type, location, tags FROM jobs_posts";
    db.query(sql, callback);
  },
};

module.exports = Job;
