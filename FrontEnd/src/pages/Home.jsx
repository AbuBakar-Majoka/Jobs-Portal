import React, { useState } from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import JobsList from "../components/JobsSection/JobsList";

export default function Home() {
  const [filter, setFilter] = useState({
    job_type: "",
    location: "",
    tags: [],
  });
  return (
    <>
      <div className="bg_color">
        <HeroSection filter={filter} setFilter={setFilter} />
      </div>
      <JobsList filter={filter} />
    </>
  );
}
