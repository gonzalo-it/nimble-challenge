import { useEffect, useState } from "react";
import { getCandidateByEmail, getJobs } from "../services/api";
import JobItem from "../components/JobItem";

export default function Home() {
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const email = "gonzalo.ramos.it@gmail.com";

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const candidateData = await getCandidateByEmail(email);
        setCandidate(candidateData);

        const jobsData = await getJobs();
        setJobs(jobsData);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Welcome {candidate.firstName}</h1>

      <h2>Available Positions</h2>

     {jobs.map((job) => (
    <JobItem key={job.id} job={job} candidate={candidate} />
  ))}
    </div>
  );
}