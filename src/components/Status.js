import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Status.css';

function Status() {
  const { problemId } = useParams();
  const navigate = useNavigate();

  const handleBackToProblem = () => {
    navigate(`/problem/${problemId}`);
  };

  return (
    <div className="status-container">
      <h1>Submission Status</h1>
      <div className="status-content">
        <p>Problem ID: {problemId}</p>
        <p>Status: Processing</p>
        <p>This is a placeholder status page. We'll implement the actual status tracking later.</p>
      </div>
      <button onClick={handleBackToProblem} className="back-button">
        Back to Problem
      </button>
    </div>
  );
}

export default Status; 