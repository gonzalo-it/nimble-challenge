import { useState } from "react";
import { applyToJob } from "../services/api";
import "./JobItem.css";

export default function JobItem({ job, candidate }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      await applyToJob({
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        applicationId: candidate.applicationId,
        repoUrl: repoUrl,
      });

      setMessage("Application sent successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

    if (message) {
    return (
        <div className="job-card-success">
        <h3>{job.title}</h3>
        <p className="job-success">{message}</p>
        </div>
    );
    }
    
  return (
  <div className="job-card">
    <h3>{job.title}</h3>

    <input
      type="text"
      placeholder="Enter GitHub repo URL"
      value={repoUrl}
      onChange={(e) => setRepoUrl(e.target.value)}
      className="job-input"
    />

    <button onClick={handleSubmit} disabled={loading || !repoUrl}>
      {loading ? "Submitting..." : "Submit"}
    </button>

    {error && <p className="job-error">Error: {error}</p>}
  </div>
);
}