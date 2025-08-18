import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function JobsForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id);

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    company: "",
    location: "",
    date: "",
    tags: "",
    type: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/jobs?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setFormData({
            id: data[0].id,
            title: data[0].title,
            company: data[0].company,
            location: data[0].location,
            date: data[0].posting_date
              ? data[0].posting_date.split("T")[0]
              : "",
            tags: data[0].tags,
            type: data[0].job_type,
          });
        })
        .catch((err) => console.error("Error loading job:", err));
    }
  }, [id]);

  // console.log(formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.title) newErrors.title = "Job Title is required";
    if (!formData.company) newErrors.company = "Company Name is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.date) newErrors.date = "Posting Date is required";
    if (!formData.tags) newErrors.tags = "At least one tag is required";
    if (!formData.type) newErrors.type = "Please select Job Type";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setMessage("");
    setLoading(true);

    try {
      const method = id ? "PUt" : "POST";
      const url = id
        ? `http://localhost:5000/api/jobs/${id}`
        : "http://localhost:5000/api/jobs";

      console.log("API Calling...");
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          company: formData.company,
          location: formData.location,
          posting_date: formData.date,
          job_type: formData.type,
          tags: formData.tags,
        }),
      });

      // console.log(response);

      if (!response.ok) {
        throw new Error(id ? "Failed to update job" : "Failed to save job");
      }

      const data = await response.json();
      console.log("Job saved:", data);

      setMessage(data.message);
      alert(data.message);
      setFormData({
        title: "",
        company: "",
        location: "",
        date: "",
        tags: "",
        type: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error while saving job!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add_job_form">
      <h2>{id ? "Edit Job" : "Add New Job"}</h2>
      <form className="job_form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title || ""}
          onChange={handleChange}
        />
        {errors.title && <span className="error">{errors.title}</span>}

        <input
          type="text"
          placeholder="Company Name"
          name="company"
          value={formData.company || ""}
          onChange={handleChange}
        />
        {errors.company && <span className="error">{errors.company}</span>}

        <input
          type="text"
          placeholder="Location"
          name="location"
          value={formData.location || ""}
          onChange={handleChange}
        />
        {errors.location && <span className="error">{errors.location}</span>}

        <input
          type="date"
          placeholder="Posting Date"
          name="date"
          value={formData.date || ""}
          onChange={handleChange}
        />
        {errors.date && <span className="error">{errors.date}</span>}

        <input
          type="text"
          placeholder="Tags (comma separated, e.g. Javascript, C#, Php)"
          name="tags"
          value={formData.tags || ""}
          onChange={handleChange}
        />
        {errors.tags && <span className="error">{errors.tags}</span>}

        <select
          name="type"
          value={formData.type || ""}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Job Type --</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Internship">Internship</option>
        </select>
        {errors.type && <span className="error">{errors.type}</span>}

        <button type="submit" className="save_btn">
          {loading ? "Saving..." : id ? "Update Job" : "Save Job"}
        </button>
        <button
          type="button"
          className="back_btn"
          onClick={() => {
            navigate("/");
          }}
        >
          Go Back
        </button>
      </form>
    </div>
  );
}
