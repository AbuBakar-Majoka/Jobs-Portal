import { useNavigate } from "react-router";

export default function JobsCard({
  id,
  title,
  company,
  location,
  posting_date,
  job_type,
  onDelete,
}) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Error while Deleting Job");
        return;
      }

      const data = await res.json();
      console.log(data);
      alert(data.message);
      onDelete(id);
    } catch (err) {
      console.error("Error deleting job:", err);
      alert("Something went wrong while deleting");
    }
  };
  return (
    <div className="jobs_card">
      <h3 className="job_title">{title}</h3>
      <p className="company_name">{company}</p>
      <p className="location">{location}</p>
      <p className="posting_date">{posting_date}</p>
      <p className="job_type">{job_type}</p>
      <div className="card_actions">
        <button
          className="edit_btn"
          onClick={() => {
            navigate(`/jobs/${id}`);
          }}
        >
          Edit Job
        </button>
        <button className="delete_btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
