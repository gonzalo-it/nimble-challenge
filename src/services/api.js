const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";


export async function getCandidateByEmail(email) {
  const response = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=${email}`
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error fetching candidate");
  }

  return response.json();
}


export async function getJobs() {
  const response = await fetch(`${BASE_URL}/api/jobs/get-list`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error fetching jobs");
  }

  return response.json();
}


export async function applyToJob(data) {
  const response = await fetch(
    `${BASE_URL}/api/candidate/apply-to-job`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Error applying to job");
  }

  return result;
}