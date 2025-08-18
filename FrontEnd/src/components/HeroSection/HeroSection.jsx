import { useNavigate } from "react-router";
import JobTypeFiler from "./JobTypeFiler";
import LocationFilter from "./LocationFilter";
import TagsFlter from "./TagsFlter";
import { useEffect, useState } from "react";

export default function HeroSection({ setFilter, filter }) {
  const navigate = useNavigate();

  const [filterData, setFilterData] = useState({
    jobTypes: [],
    location: [],
    tags: [],
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/filteringDetails")
      .then((res) => res.json())
      .then((data) => {
        const jobTypes = [...new Set(data.map((item) => item.job_type))];
        const location = [...new Set(data.map((item) => item.location))];

        const tagsArray = data.flatMap((item) =>
          item.tags ? item.tags.split(",").map((t) => t.trim()) : []
        );
        const tags = [...new Set(tagsArray)];

        setFilterData({ jobTypes, location, tags });
      })
      .catch((err) => console.error("Error fetching filter data:", err));
  }, []);

  return (
    <div className="hero_section center">
      <div className="jobs_container">
        <h1>Job Portal</h1>
        <div className="filtering">
          <h3>Filter your Job</h3>
          <div>
            <JobTypeFiler
              setFilter={setFilter}
              jobTypes={filterData.jobTypes}
              selectedJobType={filter.job_type}
            />
            <LocationFilter
              setFilter={setFilter}
              location={filterData.location}
              selectedLocation={filter.location}
            />
            <TagsFlter
              setFilter={setFilter}
              tags={filterData.tags}
              selectedTags={filter.tags}
            />
          </div>
          <button
            onClick={() => setFilter({ job_type: "", location: "", tags: [] })}
          >
            Reset
          </button>
        </div>
      </div>
      <div>
        <button className="add_job_btn" onClick={() => navigate("/jobs")}>
          Add new Job
        </button>
      </div>
    </div>
  );
}
