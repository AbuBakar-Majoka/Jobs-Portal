export default function JobTypeFiler({ setFilter, jobTypes, selectedJobType }) {
  return (
    <div className="jobType dropdown">
      <select
        value={selectedJobType}
        onChange={(e) =>
          setFilter((prev) => ({
            ...prev,
            job_type: e.target.value,
          }))
        }
      >
        <option value="">Select Job Type</option>
        {jobTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}
