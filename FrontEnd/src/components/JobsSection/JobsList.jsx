import { useEffect, useState } from "react";
import JobsCard from "./JobsCard";

export default function JobsList({ filter }) {
  const [myJobs, setMyJobs] = useState([]);

  useEffect(() => {
    let url = "http://localhost:5000/api/jobs";
    const queryParams = new URLSearchParams();

    if (filter.job_type) {
      queryParams.append("job_type", filter.job_type);
    }
    if (filter.location) {
      queryParams.append("location", filter.location);
    }
    if (filter.tags && filter.tags.length > 0) {
      queryParams.append("tags", filter.tags.join(","));
    }

    console.log(queryParams.toString());

    if ([...queryParams].length > 0) {
      url += `?${queryParams.toString()}`;
    }
    console.log(url, "url");
    console.log(filter, "filter");

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMyJobs(data);
        } else {
          setMyJobs([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setMyJobs([]);
      });
  }, [filter]);

  const handleDelete = (deletedId) => {
    setMyJobs((prevJobs) => prevJobs.filter((job) => job.id !== deletedId));
  };

  return (
    <div className="center job_container">
      <h1>All Jobs Available</h1>
      <div className="jobs_card_container">
        {myJobs.map(
          ({ id, title, company, location, posting_date, job_type }) => {
            return (
              <JobsCard
                key={id}
                id={id}
                title={title}
                company={company}
                location={location}
                posting_date={posting_date}
                job_type={job_type}
                onDelete={handleDelete}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
