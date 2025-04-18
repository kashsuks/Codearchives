import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './SubmissionView.css';

function SubmissionView() {
  const { problemId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [testCases, setTestCases] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissionData = async () => {
      try {
        setLoading(true);
        
        // Get submission data from location state
        if (location.state?.submission) {
          setSubmission(location.state.submission);
        } else {
          throw new Error('No submission data found');
        }

        // Fetch test cases
        const testCasesResponse = await fetch(`/testcases/${problemId}.json`);
        if (testCasesResponse.ok) {
          const testCasesData = await testCasesResponse.json();
          setTestCases(testCasesData.testCases);
        } else {
          throw new Error('Test cases not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissionData();
  }, [problemId, location.state]);

  const handleBackToProblem = () => {
    navigate(`/problems/${problemId}`);
  };

  if (loading) {
    return <div className="loading">Loading submission...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={handleBackToProblem}>Back to Problem</button>
      </div>
    );
  }

  return (
    <div className="submission-view">
      <div className="submission-header">
        <h1>Submission Details</h1>
        <button onClick={handleBackToProblem} className="back-button">
          Back to Problem
        </button>
      </div>

      <div className="submission-content">
        <div className="submission-info">
          <h2>Problem #{problemId}</h2>
          <div className="submission-meta">
            <span>Language: {submission.language}</span>
            <span>Status: Processing</span>
          </div>
        </div>

        <div className="submission-code">
          <h3>Submitted Code</h3>
          <pre>{submission.code}</pre>
        </div>

        <div className="test-cases">
          <h3>Test Cases</h3>
          {testCases && testCases.length > 0 ? (
            <div className="test-cases-list">
              {testCases.map((testCase, index) => (
                <div key={index} className="test-case">
                  <h4>Test Case {index + 1}</h4>
                  <div className="test-case-details">
                    <div>
                      <strong>Input:</strong>
                      <pre>{testCase.input}</pre>
                    </div>
                    <div>
                      <strong>Expected Output:</strong>
                      <pre>{testCase.output}</pre>
                    </div>
                    <div className="test-case-status">
                      <span className="status pending">Pending</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No test cases available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SubmissionView; 