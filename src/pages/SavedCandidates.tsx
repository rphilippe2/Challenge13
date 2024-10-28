import React, { useState, useEffect } from "react";

interface Candidate {
  avatar_url: string;
  login: string;
  name: string;
  location: string;
  email: string;
  company: string;
  html_url: string;
}

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from localStorage when the component mounts
  useEffect(() => {
    const candidates = localStorage.getItem("savedCandidates");
    if (candidates) {
      setSavedCandidates(JSON.parse(candidates));
    }
  }, []);

  return (
    <div className="saved-candidates-container">
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table className="candidates-table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>GitHub Profile</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={candidate.avatar_url}
                    alt={candidate.login}
                    className="candidate-avatar"
                  />
                </td>
                <td>{candidate.name || "No name provided"}</td>
                <td>{candidate.login}</td>
                <td>{candidate.location || "No location provided"}</td>
                <td>{candidate.email || "No email provided"}</td>
                <td>{candidate.company || "No company provided"}</td>
                <td>
                  <a
                    href={candidate.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Profile
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No candidates have been saved yet.</p>
      )}
    </div>
  );
};

export default SavedCandidates;
