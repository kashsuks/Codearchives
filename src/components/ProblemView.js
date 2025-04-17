import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProblemView() {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/problems/${problemId}.json`);
        
        if (!response.ok) {
          throw new Error(`Problem ${problemId} not found`);
        }
        
        const data = await response.json();
        setProblem(data);
      } catch (err) {
        console.error('Error loading problem:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId]);

  const handleBackClick = () => {
    navigate('/problem');
  };

  // Convert numeric difficulty to text
  const getDifficultyText = (difficulty) => {
    if (isNaN(Number(difficulty))) return difficulty;
    
    const diffNum = Number(difficulty);
    if (diffNum <= 2) return "Really Easy";
    if (diffNum <= 4) return "Easy";
    if (diffNum <= 6) return "Normal";
    if (diffNum <= 7) return "Hard";
    if (diffNum <= 9) return "Very Hard";
    return "Godly";
  };

  if (loading) {
    return <div className="loading">Loading problem...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={handleBackClick}>Back to Archive</button>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="error">
        <p>Problem not found</p>
        <button onClick={handleBackClick}>Back to Archive</button>
      </div>
    );
  }

  return (
    <section id="problem-view" className="page">
      <button id="back-to-archive" onClick={handleBackClick}>
        Back to Archive
      </button>
      
      <div id="problem-content">
        <h2>{problem.title}</h2>
        <div className="problem-meta">
          <span>Time Limit: {problem.timeLimit || '1s'}</span>
          <span>Memory Limit: {problem.memoryLimit || '256MB'}</span>
          <span>Difficulty: {getDifficultyText(problem.difficulty)}</span>
        </div>
        
        <div className="problem-section">
          <h3>Description</h3>
          <p>{problem.description}</p>
        </div>
        
        <div className="problem-section">
          <h3>Input Specification</h3>
          <p>{problem.inputSpec}</p>
        </div>
        
        <div className="problem-section">
          <h3>Output Specification</h3>
          <p>{problem.outputSpec}</p>
        </div>
        
        <div className="problem-section">
          <h3>Sample Test Cases</h3>
          {problem.samples && problem.samples.map((sample, index) => (
            <div className="sample-case" key={index}>
              <div className="sample-input">
                <h4>Sample Input {index + 1}</h4>
                <pre>{sample.input}</pre>
              </div>
              <div className="sample-output">
                <h4>Sample Output {index + 1}</h4>
                <pre>{sample.output}</pre>
              </div>
            </div>
          ))}
        </div>
        
        {problem.notes && (
          <div className="problem-section">
            <h3>Notes</h3>
            <p>{problem.notes}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProblemView;