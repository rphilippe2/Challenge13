import { useState, useEffect } from "react";
import { searchGithub } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface"; // Import the interface

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]); // Use the Candidate interface for the candidates array
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(
    null
  ); // Use the Candidate interface for current candidate

  // Load candidates when component mounts
  useEffect(() => {
    const fetchCandidates = async () => {
      const fetchedCandidates = await searchGithub();
      setCandidates(fetchedCandidates);
      setCurrentCandidate(fetchedCandidates[0]);
    };

    fetchCandidates();
  }, []);

  // Save candidate and move to the next one
  const saveCandidate = () => {
    const savedCandidates: Candidate[] = JSON.parse(
      localStorage.getItem("savedCandidates") || "[]"
    );
    savedCandidates.push(currentCandidate as Candidate); // Ensure type safety
    localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));

    goToNextCandidate();
  };

  // Move to the next candidate without saving
  const skipCandidate = () => {
    goToNextCandidate();
  };

  // Go to the next candidate
  const goToNextCandidate = () => {
    const newIndex = currentIndex + 1;
    if (newIndex < candidates.length) {
      setCurrentIndex(newIndex);
      setCurrentCandidate(candidates[newIndex]);
    } else {
      setCurrentCandidate(null); // No more candidates
    }
  };

  return (
    <div className="candidate-container">
      {currentCandidate ? (
        <div className="candidate-card">
          <img src={currentCandidate.avatar_url} alt={currentCandidate.login} />
          <h2>{currentCandidate.name || "No name provided"}</h2>
          <p>Username: {currentCandidate.login}</p>
          <p>Location: {currentCandidate.location || "No location provided"}</p>
          <p>Email: {currentCandidate.email || "No email provided"}</p>
          <p>Company: {currentCandidate.company || "No company provided"}</p>
          <a
            href={currentCandidate.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Profile
          </a>
          <div className="button-container">
            <button className="save" onClick={saveCandidate}>
              +
            </button>
            <button className="skip" onClick={skipCandidate}>
              -
            </button>
          </div>
        </div>
      ) : (
        <p className="no-candidates">No more candidates available</p>
      )}
    </div>
  );
};

export default CandidateSearch;
