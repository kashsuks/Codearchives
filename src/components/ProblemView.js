import React from 'react';

function ProblemView({ problem, onBackClick }) {
  return (
    <section id="problem-view" className="page">
      <button id="back-to-archive" onClick={onBackClick}>
        Back to Archive
      </button>
      
      <div id="problem-content">
        <h2>{problem.title}</h2>
        <div className="problem-meta">
          <span>Time Limit: {problem.timeLimit || '1s'}</span>
          <span>Memory Limit: {problem.memoryLimit || '256MB'}</span>
          <span>Difficulty: {problem.difficulty || 'medium'}</span>
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