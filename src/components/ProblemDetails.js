import React from 'react';

function ProblemDetails({ problem }) {
    return (
        <div className="problem-details">
            <div className="problem-sections">
                <h2>{problem.title}</h2>

                <div className="problem-section">
                    <h3>Input Specification</h3>
                    <p>{problem.inputSpecification}</p>
                </div>

                <div className="problem-section">
                    <h3>Output Specification</h3>
                    <p>{problem.outputSpecification}</p>
                </div>

                <div className="problem-section">
                    <h3>Constraints</h3>
                    <p>{problem.constraints}</p>
                </div>

                <div className="problem-section">
                    <h3>Subtasks</h3>
                    {problem.subtasks.map((subtask, index) => (
                        <div key={index}>
                            <h4>{subtask.title}</h4>
                            <p>{subtask.description}</p>
                        </div>
                    ))}
                </div>

                <div className="problem-section">
                    <h3>Sample Input</h3>
                    <pre className="code-block">{problem.sampleInput}</pre>
                </div>

                <div className="problem-section">
                    <h3>Sample Output</h3>
                    <pre className="code-block">{problem.sampleOutput}</pre>
                </div>
            </div>

            <div className="problem-sidebar">
                <div className="problem-meta">
                    <button className="view-pdf">View as PDF</button>
                    <button className="submit-solution">Submit Solution</button>
                </div>

                <div className="sidebar-section">
                    <h3>All submissions</h3>
                    <p>Best submissions</p>
                    <p>Voting statistics</p>
                </div>

                <div className="sidebar-section">
                    <p>Points: {problem.points} (partial)</p>
                    <p>Time limit: {problem.timeLimit}</p>
                    <p>Memory limit: {problem.memoryLimit}</p>
                </div>

                <div className="sidebar-section">
                    <p>Author: {problem.author}</p>
                    <p>Problem type: {problem.problemType}</p>
                </div>
            </div>
        </div>
    );
}

export default ProblemDetails;