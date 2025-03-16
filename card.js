import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JobBoard.css";


const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [newJob, setNewJob] = useState({ title: "", company: "", location: "" });

  useEffect(() => {
    axios
      .get("https://67b4abdaa9acbdb38ecff2c9.mockapi.io/board")
      .then((response) => setJobs(response.data))
      .catch(console.error);
  }, []);

  const handleInputChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const addJob = () => {
    if (newJob.title && newJob.company && newJob.location) {
      axios.post("https://67b4abdaa9acbdb38ecff2c9.mockapi.io/board", newJob)
        .then((response) => {
          setJobs([...jobs, response.data]);
          setNewJob({ title: "", company: "", location: "" });
        })
        .catch(console.error);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    [job.title, job.company, job.location].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
  
    
    <div className="App">
      <h1>Job Board</h1>
      <div className="job-form">
        <input type="text" name="title" placeholder="Job Title" value={newJob.title} onChange={handleInputChange} />
        <input type="text" name="company" placeholder="Company Name" value={newJob.company} onChange={handleInputChange} />
        <input type="text" name="location" placeholder="Location" value={newJob.location} onChange={handleInputChange} />
        <button onClick={addJob}>Post Job</button>
      </div>
      <div className="search-bar">
        <input type="text" className="search-bar" placeholder="Search jobs..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="job-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div key={index} className="job-card">
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <button className="apply-button">Apply Now</button>
            </div>
          ))
        ) : (
          <p className="no-jobs">No jobs found</p>
        )}
      </div>
    </div>
  );
};

export default JobBoard;